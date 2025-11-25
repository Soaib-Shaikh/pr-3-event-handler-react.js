import React, { useEffect, useState } from 'react'
import Rating from './Rating';
import { FaStar } from 'react-icons/fa';
import '../components/Feedback.css'

const Feedback = () => {

    const [user, setUser] = useState([])
    const [formData, setFormData] = useState({});

    useEffect(() => {
        const saveData = JSON.parse(localStorage.getItem("feedbacks"));
        if (saveData) {
            setUser(saveData);
        }
    },[])

    useEffect(() => {
        localStorage.setItem("feedbacks", JSON.stringify(user));
    },[user])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value })
    }

    const handleRating = (ratVal) => {
        setFormData({ ...formData, rating: ratVal })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setUser([...user, formData]);
        setFormData({});

    }

    console.log(user);
    return (
        <>
            <div className="container">
                <div className="row justify-content-center mt-5">
                    <div className="col-md-6">
                        <form method='post' onSubmit={handleSubmit}>
                            <h2 className='text-center'>Feedback Form</h2>
                            <div className="mb-3">
                                <label htmlFor="username" className="form-label">Username:</label>
                                <input type="text" name='username' value={formData.username || ''} onChange={handleChange} placeholder='Enter Username' className="form-control" id="username" aria-describedby="emailHelp" />

                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email: </label>
                                <input type="email" name='email' value={formData.email || ''} onChange={handleChange} placeholder='Enter Email' className="form-control" id="email" aria-describedby="emailHelp" />

                            </div>
                            
                            <div className="mb-3">
                                <label htmlFor="message" className="form-label">Feedback:</label>
                                <textarea name='message' value={formData.message || ''} onChange={handleChange} placeholder='Write Your Feedback' className="form-control" id="message" rows="4"></textarea>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="rating" className="form-label">Rating</label>
                                <Rating onRate={handleRating} rating={formData.rating} />
                            </div>
                            <button type="submit" className="btn">Submit</button>
                        </form>

                    </div>
                </div>

                <h2 className="cards-heading mt-5">Submitted Feedbacks</h2>
                <div className="row justify-content-center mt-5 cards-row">

                    {
                        user.map((val, index) => {
                            const { username, email, message, rating} = val;
                            return (
                                <div className="feedback-card" key={index}>
                                    <div className="card-header-section">
                                        <h5 className="card-client-name">{username}</h5>
                                        <div className="card-stars">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <FaStar
                                                    key={star}
                                                    size={18}
                                                    color={rating >= star ? "#ffc107" : "#ddd"}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                    <div className="card-message-section">
                                        <p className="card-message">{message}</p>
                                    </div>
                                    <div className="card-footer-section">
                                        <div className="user-avatar-circle">
                                            <FaStar size={28} color="#ffffff" />
                                        </div>
                                        <div className="user-details">
                                            <h6 className="user-full-name">{username}</h6>
                                            <p className="user-email">{email}</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default Feedback
