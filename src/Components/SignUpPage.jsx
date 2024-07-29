import axios from 'axios'
import { useFormik } from 'formik'
import  { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import { toast, Slide, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactLoading from 'react-loading';

const SignUpPage = () => {
    const [loading, setLoading] = useState(false);

    // Initialize the navigate function for redirecting
    const navigate = useNavigate();

    // Function to handle click event for returning to login page
    const handleLoginClick = () => {
        navigate("/login")
    }

    // Set up formik for form handling and validation
    const formik = useFormik({

        // Initial values
        initialValues: {
            email: '',
            password: ''
        },

        // Validations
        validationSchema: yup.object({
            email: yup.string()
                .email('Invalid email')
                .required('Email is required'),
            password: yup.string()
                .required("Password is required")
                .min(8, "Password should be min 8 characters")
        }),


        onSubmit: (values) => { // Function to handle form submission
            setLoading(true);
            axios.post("/register", values).then(res => { // POST call
                setLoading(false);
                if (res.data.status) {
                    formik.resetForm();
                    toast.success("User registered successfully", { // Notification
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        transition: Slide // Use Slide for right-side animation
                    });
                }
                else {
                    toast.error("User already registered"); // Notification
                }

            }).catch(res => {
                setLoading(false);
                toast.error("Registration failed, Please try again later"); // Notification
            })

        }
    })
    return (
        <div className='vh-100 d-flex justify-content-center align-items-center bg-color'>
            <div className="outer-container">
                <p className='title'>Let's start</p>
                <p className='text1'>Please sign up or login to continue</p>
                <form action="" onSubmit={formik.handleSubmit}>
                    <div className="input-container">
                        {
                            formik.touched.email && formik.errors.email ?
                                <div className='erro-msg'>{formik.errors.email}</div> : null
                        }
                        <i className='bx bx-envelope'></i>
                        <input
                            type="email"
                            placeholder='Email'
                            {...formik.getFieldProps("email")}
                        ></input>
                    </div>
                    <div className="input-container">
                        {
                            formik.touched.password && formik.errors.password ?
                                <div className='erro-msg'>{formik.errors.password}</div> : null
                        }
                        <i className='bx bx-lock-alt'></i>
                        <input
                            type="password"
                            placeholder='Password'
                            {...formik.getFieldProps("password")}
                        />
                    </div>
                    <button className='custom-btn' type="submit">Sign Up</button>
                </form>
                <p className='d-flex justify-content-center g-2 text2'>Already Have An Account? <span onClick={handleLoginClick}>Login</span></p>
            </div>

            {/* Toast container for displaying notifications */}

            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            {
                loading &&
                <div className="loading-container">
                    <ReactLoading type="spinningBubbles" color="#ed7632" />
                </div>
            }
        </div>
    )
}

export default SignUpPage