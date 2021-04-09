const Error = ({ error }) => {
  return (
    <div>
      <h1>{error.status}</h1>
      {error.message}
    </div>
  );
};

export default Error;
