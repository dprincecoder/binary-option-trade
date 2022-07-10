import React from "react";

const styles = {
  page: {
    padding: "1.5rem",
  },
  nav: {
    width: "100%",
    boxShadow:
      "rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px",
    padding: "1rem",
    p: { marginLeft: "2rem" },
    marginBottom: "1rem",
  },
  helper: {
    marginLeft: "2rem",
  },
  reasons: {
    marginLeft: "2rem",
  },
  ol: {
    marginLeft: "3rem",
  },
  resolve: {
    margin: "8px",
  },
  options: {
    marginLeft: "2rem",
  },
  visitor: {
    marginBottom: "8px",
  },
};
const ErrorPage = () => {
  return (
    <div style={styles.page} className="errorPage">
      <div className="error-title" style={styles.nav}>
        <h1>Site Not Found</h1>
        <p>Or temporary down</p>
      </div>
      <div className="error-helper" style={styles.helper}>
        <div className="error-helper-title">
          <h2>Why am i seeing this?</h2>
        </div>
        <div className="error-helper-reasons" style={styles.reasons}>
          <h3>There are a few potential reasons:</h3>
          <ol className="error-helper-listing" style={styles.ol}>
            <li className="error-helper-listing-li">
              Site is down due to temporary issues.
            </li>
            <li className="error-helper-listing-li">
              Due to domain check, this site is down.
            </li>
            <li className="error-helper-listing-li">
              This Site domain subscription has expired.
            </li>
            <li className="error-helper-listing-li">
              Site Hosting subscription has expired.
            </li>
            <li className="error-helper-listing-li">
              Domain or hosting plan should be renewed.
            </li>
          </ol>
        </div>
        <div className="error-recovery" style={styles.resolve}>
          <div className="recovery-title">
            <h2>How do i resolve this?</h2>
          </div>
          <div className="recovery-options" style={styles.options}>
            <div className="visitor" style={styles.visitor}>
              <h4>If you are a visitor to this site</h4>
              <p style={{ marginLeft: "2rem" }}>
                Reload this page, if problem persist try again later
              </p>
            </div>
            <div className="developer">
              <h4>If you are the developer</h4>
              <p style={{ marginLeft: "2rem" }}>
                Check your console for issues related to this problem and fix
                them.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
