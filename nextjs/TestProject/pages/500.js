import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);

    // Define a state variable to track whether is an error or not
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI

    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    // You can use your own error logging service here
    console.log({ error, errorInfo });
  }
  render() {
    // Check if the error is thrown
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="bg-black h-screen capitalize text-white flex flex-col items-center justify-center text-lg gap-4">
          <h2>
            Application error! you can check for errors in your browser console.
          </h2>
          <button
            className="bg-white px-5 py-2 text-center text-lg text-black rounded-xl cursor-pointer"
            onClick={() => this.setState({ hasError: false })}>
            Try again
          </button>
        </div>
      );
    }

    // Return children components in case of no error

    return this.props.children;
  }
}

export default ErrorBoundary;
