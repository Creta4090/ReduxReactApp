import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container-fluid py-4">
        <div className="row">
          <div className="col-md-4 mb-3">
            <h5 className="fw-bold mb-2">Logo</h5>
            <p className="small text-muted">
              A modern application for exploring and managing posts with Redux Toolkit.
            </p>
          </div>
          <div className="col-md-4 mb-3">
            <h6 className="fw-bold mb-2">Quick Links</h6>
            <ul className="list-unstyled small">
              <li className="mb-1">
                <a href="#home" className="footer-link">
                  Home
                </a>
              </li>
              <li className="mb-1">
                <a href="#posts" className="footer-link">
                  Posts
                </a>
              </li>
              <li className="mb-1">
                <a href="#about" className="footer-link">
                  About
                </a>
              </li>
            </ul>
          </div>
          <div className="col-md-4 mb-3">
            <h6 className="fw-bold mb-2">Follow Us</h6>
            <div className="small">
              <a href="#twitter" className="footer-link me-3">
                🐦 Twitter
              </a>
              <a href="#github" className="footer-link me-3">
                🐙 GitHub
              </a>
              <a href="#linkedin" className="footer-link">
                💼 LinkedIn
              </a>
            </div>
          </div>
        </div>
        <hr className="border-light my-3" />
        <div className="text-center small text-muted">
          <p className="mb-0">
            &copy; {new Date().getFullYear()}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
