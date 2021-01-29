// This file simulates real-world error handler that makes this component observable
const errorHandler = {
  handleError: async (errorToHandle) => {
    console.error(errorToHandle);
    metricsExporter.fireMetric('error', {
      errorName: errorToHandle.name || 'generic-error',
    });

    // A common best practice is to crash when an unknown error (non-trusted) is being thrown
    decideWhetherToCrash(errorToHandle);
  },
};

const decideWhetherToCrash = (error) => {
  if (!error.isTrusted) {
    process.exit();
  }
};

class AppError extends Error {
  constructor(name, isTrusted, status, message = 'Something wrong') {
    super(message);
    this.name = name;
    this.isTrusted = isTrusted;
    this.status = status;
  }
}

// This simulates a typical monitoring solution that allow firing custom metrics when
// like Prometheus, DataDog, CloudWatch, etc
const metricsExporter = {
  fireMetric: async (name, labels) => {
    console.log('In real production code I will really fire metrics');
  },
};

module.exports.errorHandler = errorHandler;
module.exports.metricsExporter = metricsExporter;
module.exports.AppError = AppError;
