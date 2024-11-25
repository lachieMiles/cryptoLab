// Error page returns a section element that contains two <h1> elements
// the first element returns a 404 text satement
// the second returns ¯\_(ツ)_/¯ => representing a confused man...
// we then export the error page which will be used in `main.tsx`

const ErrorPage = () => {
  return (
    <section>
      <h1>404: Page Not Found</h1>
      <h1> ¯\_(ツ)_/¯</h1>
    </section>
  );
};

export default ErrorPage;
