import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ShieldCheck,
  Eye,
  EyeOff,
  Mail,
  LockKeyhole,
  UserRound,
  ArrowRight,
  ShieldAlert,
  Fingerprint,
  Activity,
} from "lucide-react";
import "./Auth.css";

export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState("");

  function handleLogin(event) {
    event.preventDefault();
    setError("");

    if (!email.trim() || !password) {
      setError("Please enter your email and password.");
      return;
    }

    // Demo-only login. Connect a backend for real authentication.
    const profile = {
      email: email.trim().toLowerCase(),
    };

    if (remember) {
      localStorage.setItem("brandshieldSession", JSON.stringify(profile));
    } else {
      sessionStorage.setItem("brandshieldSession", JSON.stringify(profile));
    }

    navigate("/dashboard");
  }

  return (
    <main className="auth-page">
      <section className="auth-visual">
        <Link to="/login" className="auth-brand">
          <span className="brand-icon">
            <ShieldCheck size={25} />
          </span>
          <span>
            <strong>BrandShield</strong>
            <small>AI RISK INTELLIGENCE</small>
          </span>
        </Link>

        <div className="visual-content">
          <div className="visual-badge">
            <span className="live-dot" />
            DIGITAL TRUST PLATFORM
          </div>

          <h1>
            Protect your brand.
            <br />
            <span>Stay one step ahead.</span>
          </h1>

          <p className="visual-description">
            Bring digital risk signals into one place and make
            smarter decisions to protect your brand's online presence.
          </p>

          <div className="security-preview">
            <div className="preview-top">
              <div>
                <small>SECURITY OVERVIEW</small>
                <h3>Your brand, in focus</h3>
              </div>
              <Activity size={22} />
            </div>

            <div className="preview-line">
              <span className="preview-icon">
                <ShieldCheck size={19} />
              </span>
              <div>
                <strong>Brand monitoring</strong>
                <small>Review digital risk indicators</small>
              </div>
              <span className="preview-status">READY</span>
            </div>

            <div className="preview-line">
              <span className="preview-icon purple">
                <Fingerprint size={19} />
              </span>
              <div>
                <strong>Risk intelligence</strong>
                <small>Investigate suspicious signals</small>
              </div>
              <span className="preview-status">ACTIVE</span>
            </div>
          </div>
        </div>

        <div className="visual-footer">
          <span>
            <ShieldCheck size={15} />
            Built for digital trust
          </span>
          <span>BRANDSHIELD AI © 2026</span>
        </div>
      </section>

      <section className="auth-form-section">
        <div className="mobile-brand">
          <ShieldCheck size={25} />
          <strong>BrandShield AI</strong>
        </div>

        <div className="auth-card">
          <div className="form-heading">
            <span className="form-eyebrow">WELCOME BACK</span>
            <h2>Sign in to your account</h2>
            <p>Enter your details to access your workspace.</p>
          </div>

          <form onSubmit={handleLogin}>
            <label htmlFor="login-email">Work email</label>
            <div className="auth-input">
              <Mail size={18} />
              <input
                id="login-email"
                type="email"
                placeholder="you@company.com"
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>

            <div className="password-label">
              <label htmlFor="login-password">Password</label>
              <button
                className="text-link"
                type="button"
                onClick={() =>
                  setError(
                    "Password recovery will be available after backend integration."
                  )
                }
              >
                Forgot password?
              </button>
            </div>

            <div className="auth-input">
              <LockKeyhole size={18} />
              <input
                id="login-password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
              <button
                className="password-toggle"
                type="button"
                aria-label={showPassword ? "Hide password" : "Show password"}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <label className="remember-option">
              <input
                type="checkbox"
                checked={remember}
                onChange={(event) => setRemember(event.target.checked)}
              />
              <span>Keep me signed in on this device</span>
            </label>

            {error && <div className="auth-error">{error}</div>}

            <button className="auth-submit" type="submit">
              Sign in to workspace
              <ArrowRight size={18} />
            </button>
          </form>

          <div className="auth-divider">
            <span>NEW TO BRANDSHIELD?</span>
          </div>

          <Link to="/register" className="secondary-submit">
            Create your account
          </Link>

          <p className="auth-terms">
            By continuing, you agree to our <a href="#terms">Terms of Service</a>
            {" "}and <a href="#privacy">Privacy Policy</a>.
          </p>
        </div>

        <div className="form-security-note">
          <ShieldAlert size={16} />
          <span>Your digital security starts here.</span>
        </div>
      </section>
    </main>
  );
}

export function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [error, setError] = useState("");

  function handleRegister(event) {
    event.preventDefault();
    setError("");

    if (name.trim().length < 2) {
      setError("Please enter your full name.");
      return;
    }

    if (password.length < 8) {
      setError("Your password must contain at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Your passwords do not match.");
      return;
    }

    if (!acceptedTerms) {
      setError("Please accept the Terms of Service to continue.");
      return;
    }

    // Demo-only profile. Passwords are not stored in the browser.
    localStorage.setItem(
      "brandshieldPendingProfile",
      JSON.stringify({
        name: name.trim(),
        email: email.trim().toLowerCase(),
      })
    );

    navigate("/login", { state: { registered: true } });
  }

  return (
    <main className="auth-page">
      <section className="auth-visual">
        <Link to="/login" className="auth-brand">
          <span className="brand-icon">
            <ShieldCheck size={25} />
          </span>
          <span>
            <strong>BrandShield</strong>
            <small>AI RISK INTELLIGENCE</small>
          </span>
        </Link>

        <div className="visual-content">
          <div className="visual-badge">
            <span className="live-dot" />
            YOUR SECURITY JOURNEY STARTS HERE
          </div>

          <h1>
            Build trust.
            <br />
            <span>Protect what matters.</span>
          </h1>

          <p className="visual-description">
            Create your workspace to explore brand risk signals,
            organize investigations, and strengthen digital trust.
          </p>

          <div className="register-benefits">
            <div>
              <span><ShieldCheck size={20} /></span>
              <p>
                <strong>One central workspace</strong>
                <small>Organize digital risk reviews in one place.</small>
              </p>
            </div>

            <div>
              <span><Activity size={20} /></span>
              <p>
                <strong>Actionable insights</strong>
                <small>Review signals and prioritize investigations.</small>
              </p>
            </div>

            <div>
              <span><Fingerprint size={20} /></span>
              <p>
                <strong>Designed for digital trust</strong>
                <small>Build a consistent brand protection workflow.</small>
              </p>
            </div>
          </div>
        </div>

        <div className="visual-footer">
          <span>
            <ShieldCheck size={15} />
            Built for digital trust
          </span>
          <span>BRANDSHIELD AI © 2026</span>
        </div>
      </section>

      <section className="auth-form-section register-section">
        <div className="mobile-brand">
          <ShieldCheck size={25} />
          <strong>BrandShield AI</strong>
        </div>

        <div className="auth-card">
          <div className="form-heading">
            <span className="form-eyebrow">GET STARTED</span>
            <h2>Create your account</h2>
            <p>Set up your workspace in just a few steps.</p>
          </div>

          <form onSubmit={handleRegister}>
            <label htmlFor="register-name">Full name</label>
            <div className="auth-input">
              <UserRound size={18} />
              <input
                id="register-name"
                type="text"
                placeholder="Enter your full name"
                autoComplete="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
              />
            </div>

            <label htmlFor="register-email">Work email</label>
            <div className="auth-input">
              <Mail size={18} />
              <input
                id="register-email"
                type="email"
                placeholder="you@company.com"
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>

            <label htmlFor="register-password">Create password</label>
            <div className="auth-input">
              <LockKeyhole size={18} />
              <input
                id="register-password"
                type={showPassword ? "text" : "password"}
                placeholder="At least 8 characters"
                autoComplete="new-password"
                minLength={8}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
              <button
                className="password-toggle"
                type="button"
                aria-label={showPassword ? "Hide password" : "Show password"}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <label htmlFor="confirm-password">Confirm password</label>
            <div className="auth-input">
              <LockKeyhole size={18} />
              <input
                id="confirm-password"
                type={showPassword ? "text" : "password"}
                placeholder="Re-enter your password"
                autoComplete="new-password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                required
              />
            </div>

            <label className="remember-option terms-option">
              <input
                type="checkbox"
                checked={acceptedTerms}
                onChange={(event) => setAcceptedTerms(event.target.checked)}
              />
              <span>
                I agree to the <a href="#terms">Terms of Service</a> and{" "}
                <a href="#privacy">Privacy Policy</a>.
              </span>
            </label>

            {error && <div className="auth-error">{error}</div>}

            <button className="auth-submit" type="submit">
              Create account
              <ArrowRight size={18} />
            </button>
          </form>

          <p className="auth-switch">
            Already have an account? <Link to="/login">Sign in</Link>
          </p>

          <p className="auth-terms">
            Your account security matters. Never share your password.
          </p>
        </div>

        <div className="form-security-note">
          <ShieldAlert size={16} />
          <span>Start building a safer digital presence.</span>
        </div>
      </section>
    </main>
  );
}