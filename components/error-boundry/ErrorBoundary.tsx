"use client";
import React, { Component, ReactNode } from "react";
import { Button, Result } from "antd";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);

    // Define a state variable to track whether there is an error or not
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error: error, errorInfo: null };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    // You can use your own error logging service here
    console.log({ error, errorInfo });

    // Update state with error info
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
  }

  render() {
    // Check if the error is thrown
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div>
          {/* <h2>Oops, there is an error!</h2>
          {this.state.error && <p>{this.state.error.toString()}</p>}
          {this.state.errorInfo && (
            <details style={{ whiteSpace: "pre-wrap" }}>
              {this.state.errorInfo.componentStack}
            </details>
          )}
          <button
            type="button"
            onClick={() =>
              this.setState({ hasError: false, error: null, errorInfo: null })
            }
          >
            Try again?
          </button> */}
          <div role="alert" className="flex h-full items-center justify-center">
            <Result
              className="w-full"
              status="500"
              title={
                <pre>{this.state.error && this.state.error.toString()}</pre>
              }
              subTitle="Sorry, something went wrong."
              extra={
                <Button
                  type="primary"
                  onClick={() =>
                    this.setState({
                      hasError: false,
                      error: null,
                      errorInfo: null,
                    })
                  }
                >
                  Try again
                </Button>
              }
            />
          </div>
        </div>
      );
    }

    // Return children components in case of no error
    return this.props.children;
  }
}

export default ErrorBoundary;
