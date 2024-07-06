import { useState } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import { Toast } from 'react-bootstrap';
import logo from './logo3.png';
import styles from "./styles.module.css";

const Login = () => {
    const [data, setData] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const [showToast, setShowToast] = useState(false);
    const [toastText, setToastText] = useState("");
    const history = useHistory();

    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value });
    };

    const handleToast = (show, text) => {
        setShowToast(show);
        setToastText(text);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = "http://localhost:5000/api/auth";
            const { data: res } = await axios.post(url, data);
            localStorage.setItem("token", res.token);
            handleToast(true, "Login successful. You can now browse courses");
            setTimeout(() => {
                history.push("/courses");
            }, 3000);
        } catch (error) {
            console.error("Login error:", error);
            if (error.response && error.response.status >= 400 && error.response.status <= 500) {
                setError(error.response.data.message);
            } else {
                setError("An unexpected error occurred. Please try again.");
            }
        }
    };

    return (
        <div className={styles.login_container}>
            <div className={styles.login_form_container}>
                <div className={styles.left}>
                    <form className={styles.form_container} onSubmit={handleSubmit}>
                        <h1>Login to Your Account</h1>
                        <input
                            type="email"
                            placeholder="Email"
                            name="email"
                            onChange={handleChange}
                            value={data.email}
                            required
                            className={styles.input}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            onChange={handleChange}
                            value={data.password}
                            required
                            className={styles.input}
                        />
                        {error && <div className={styles.error_msg}>{error}</div>}
                        <button type="submit" className={styles.green_btn}>
                            Sign In
                        </button>
                    </form>
                </div>
                <div className={styles.right}>
                    <h1>New Here ?</h1>
                    <Link to="/signup">
                        <button type="button" className={styles.white_btn}>
                            Sign Up
                        </button>
                    </Link>
                </div>
            </div>
            <Toast show={showToast} onClose={() => setShowToast(false)} delay={3000} autohide style={{ position: 'fixed', bottom: 30, right: 10, width: 500, backgroundColor: 'green' }}>
                <Toast.Header>
                    <img src={logo} className="rounded mr-2" alt="system logo" style={{ width: 20, height: 20 }} />
                    <strong className="mr-auto">System message</strong>
                </Toast.Header>
                <Toast.Body>{toastText}</Toast.Body>
            </Toast>
        </div>
    );
};

export default Login;
