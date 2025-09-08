/**
 * Performance optimization utilities
 */

/**
 * Batches DOM reads and writes to prevent forced reflows
 * This helps prevent layout thrashing by separating read and write operations
 */
class DOMBatch {
  private readQueue: Array<() => any> = [];
  private writeQueue: Array<() => void> = [];
  private scheduled = false;

  /**
   * Add a DOM read operation to the queue
   * @param callback Function that reads from the DOM
   * @returns A function that will execute the read when processed
   */
  read<T>(callback: () => T): () => T {
    this.readQueue.push(callback as () => any);
    this.schedule();
    
    return () => {
      const index = this.readQueue.indexOf(callback as () => any);
      if (index !== -1) {
        return this.readQueue.splice(index, 1)[0]() as T;
      }
      return callback();
    };
  }

  /**
   * Add a DOM write operation to the queue
   * @param callback Function that writes to the DOM
   * @returns A function that will execute the write when processed
   */
  write(callback: () => void): () => void {
    this.writeQueue.push(callback);
    this.schedule();
    
    return () => {
      const index = this.writeQueue.indexOf(callback);
      if (index !== -1) {
        this.writeQueue.splice(index, 1)[0]();
      } else {
        callback();
      }
    };
  }

  /**
   * Schedule the processing of the queues
   */
  private schedule(): void {
    if (!this.scheduled) {
      this.scheduled = true;
      requestAnimationFrame(() => this.process());
    }
  }

  /**
   * Process all queued operations
   * First read from the DOM, then write to the DOM
   */
   private process(): void {
     // Process all read operations first
     const reads = this.readQueue.slice();
     this.readQueue = [];
     
     // Execute all reads before writes to prevent forced reflows
     reads.forEach(read => read());
     
     // Process all write operations
     const writes = this.writeQueue.slice();
     this.writeQueue = [];
     writes.forEach(write => write());
     
     this.scheduled = false;
     
     // If new operations were added during processing, schedule another frame
     if (this.readQueue.length || this.writeQueue.length) {
       this.schedule();
     }
   }
}

// Create a singleton instance
export const domBatch = new DOMBatch();

/**
 * Throttles a function to limit how often it can be called
 * @param func The function to throttle
 * @param limit The time limit in milliseconds
 * @returns A throttled version of the function
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => ReturnType<T> | undefined {
  let lastCall = 0;
  let lastResult: ReturnType<T>;
  
  return function(this: any, ...args: Parameters<T>): ReturnType<T> | undefined {
    const now = Date.now();
    
    if (now - lastCall >= limit) {
      lastCall = now;
      lastResult = func.apply(this, args);
      return lastResult;
    }
    
    return lastResult;
  };
}

/**
 * Debounces a function to delay its execution until after a period of inactivity
 * @param func The function to debounce
 * @param wait The wait time in milliseconds
 * @returns A debounced version of the function
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  
  return function(this: any, ...args: Parameters<T>): void {
    const later = () => {
      timeout = null;
      func.apply(this, args);
    };
    
    if (timeout !== null) {
      clearTimeout(timeout);
    }
    
    timeout = setTimeout(later, wait);
  };
}

/**
 * Measures the execution time of a function
 * @param name Name of the measurement
 * @param func Function to measure
 * @returns The result of the function
 */
export function measure<T>(name: string, func: () => T): T {
  performance.mark(`${name}-start`);
  const result = func();
  performance.mark(`${name}-end`);
  performance.measure(name, `${name}-start`, `${name}-end`);
  return result;
}

/**
 * Creates a passive event listener option object
 * @param passive Whether the event listener is passive
 * @returns Event listener options object
 */
export function passiveEventOptions(passive: boolean = true): AddEventListenerOptions {
  return { passive, capture: false };
}
