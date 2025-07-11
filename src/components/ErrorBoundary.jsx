import { Component } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";

// Wrapper to inject `navigate` into a class component
function ErrorBoundaryWithNavigate(props) {
  const navigate = useNavigate();
  return <ErrorBoundary {...props} navigate={navigate} />;
}

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  handleNavigateHome = () => {
    this.setState({ hasError: false });
    this.props.navigate("/"); // Navigate to home
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex h-screen flex-col items-center justify-center bg-gray-50 px-4 text-center">
          <h1 className="mb-4 text-3xl font-bold text-red-600">
            Something went wrong
          </h1>
          <p className="mb-6 text-gray-600">
            An unexpected error occurred. Click below to return to the homepage.
          </p>
          <button
            onClick={this.handleNavigateHome}
            className="rounded-md bg-blue-600 px-4 py-2 text-white shadow-md transition hover:bg-blue-700"
          >
            Go Home
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundaryWithNavigate;
