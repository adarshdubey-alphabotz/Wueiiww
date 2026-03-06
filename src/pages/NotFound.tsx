import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="mb-4 text-display text-[8rem] leading-none tracking-wider text-primary">404</h1>
        <p className="mb-4 text-xl text-muted-foreground font-medium">Oops! Page not found</p>
        <a href="/" className="btn-accent rounded-none text-sm inline-flex">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
