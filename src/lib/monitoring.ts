export class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private metrics: Map<string, number[]> = new Map();
  private ws: WebSocket | null = null;

  static getInstance() {
    if (!this.instance) {
      this.instance = new PerformanceMonitor();
    }
    return this.instance;
  }

  constructor() {
    if (typeof window !== 'undefined') {
      this.initializeObservers();
      this.connectWebSocket();
    }
  }

  private initializeObservers() {
    // Core Web Vitals
    if ('PerformanceObserver' in window) {
      // LCP
      new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          this.recordMetric('lcp', entry.startTime);
        });
      }).observe({ entryTypes: ['largest-contentful-paint'] });

      // FID
      new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          this.recordMetric('fid', entry.processingStart - entry.startTime);
        });
      }).observe({ entryTypes: ['first-input'] });

      // CLS
      new PerformanceObserver((list) => {
        let cls = 0;
        list.getEntries().forEach((entry: any) => {
          if (!entry.hadRecentInput) {
            cls += entry.value;
          }
        });
        this.recordMetric('cls', cls);
      }).observe({ entryTypes: ['layout-shift'] });
    }

    // Custom metrics
    this.measureResourceLoadTime();
    this.measureMemoryUsage();
    this.measureFPS();
  }

  private measureResourceLoadTime() {
    window.addEventListener('load', () => {
      const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
      this.recordMetric('loadTime', loadTime);
    });
  }

  private measureMemoryUsage() {
    if ('memory' in performance) {
      setInterval(() => {
        const memory = (performance as any).memory;
        const usagePercent = (memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100;
        this.recordMetric('memoryUsage', usagePercent);
      }, 5000);
    }
  }

  private measureFPS() {
    let lastTime = performance.now();
    let frames = 0;
    
    const measureFrame = () => {
      frames++;
      const currentTime = performance.now();
      
      if (currentTime >= lastTime + 1000) {
        const fps = Math.round((frames * 1000) / (currentTime - lastTime));
        this.recordMetric('fps', fps);
        frames = 0;
        lastTime = currentTime;
      }
      
      requestAnimationFrame(measureFrame);
    };
    
    requestAnimationFrame(measureFrame);
  }

  private connectWebSocket() {
    if (process.env.NODE_ENV === 'production') {
      this.ws = new WebSocket('wss://analytics.scorpiuscore.com/metrics');
      
      this.ws.onopen = () => {
        console.log('Connected to analytics server');
        this.sendMetrics();
      };
      
      this.ws.onerror = (error) => {
        console.error('WebSocket error:', error);
      };
    }
  }

  private recordMetric(name: string, value: number) {
    if (!this.metrics.has(name)) {
      this.metrics.set(name, []);
    }
    
    const values = this.metrics.get(name)!;
    values.push(value);
    
    // Keep only last 100 values
    if (values.length > 100) {
      values.shift();
    }
  }

  private sendMetrics() {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      const metricsData = Object.fromEntries(
        Array.from(this.metrics.entries()).map(([key, values]) => [
          key,
          {
            average: values.reduce((a, b) => a + b, 0) / values.length,
            min: Math.min(...values),
            max: Math.max(...values),
            latest: values[values.length - 1],
          }
        ])
      );
      
      this.ws.send(JSON.stringify({
        type: 'performance',
        timestamp: Date.now(),
        userAgent: navigator.userAgent,
        url: window.location.href,
        metrics: metricsData,
      }));
    }
    
    // Send metrics every 30 seconds
    setTimeout(() => this.sendMetrics(), 30000);
  }

  public getMetrics() {
    return this.metrics;
  }
}

// Initialize on app load
if (typeof window !== 'undefined') {
  PerformanceMonitor.getInstance();
}
