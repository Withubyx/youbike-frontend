import './BikeDetail.css'
import Button from "../button/Button.jsx";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import {youBikeApiBaseUrl} from "../../config/configuration.js";
import {useForm} from "react-hook-form";
import BikeCommentCard from "../bikeCommentCard/BikeCommentCard.jsx";

function BikeDetail(
    {
        user,
        bikeImage,
        bike,
        forHomePage,
        errorMessageNextRandomBike,
        errorMessageDownloadBikeImage,
        nextRandomBikeFunction,
        downloadBikeImageFunction,
        disableDownloadBikeImageButton,
    }) {
    const {register, handleSubmit, reset, formState: {errors}} = useForm({mode: "onChange"});
    const navigate = useNavigate();
    const [comments, setComments] = useState([]);
    const [fetchCommentsAfterPost, toggleFetchCommentsAfterPost] = useState(false);
    const [commentSection, toggleCommentSection] = useState(false);
    const [disableCommentButton, toggleDisableCommentButton] = useState(false);
    const [errorGettingCommentsMessage, setErrorGettingCommentsMessage] = useState("");
    const [errorPostingCommentMessage, setErrorPostingCommentMessage] = useState("");

    const token = localStorage.getItem("token");

    useEffect(() => {
        const controller = new AbortController();

        async function fetchBikeCommentsData() {
            setErrorGettingCommentsMessage("")
            try {
                const result = await axios.get(`${youBikeApiBaseUrl}/bike-comments/bikes/${bike.bike_id}`,
                    {signal: controller.signal});
                setComments(result.data);
            } catch (e) {
                console.error(e);
                setErrorGettingCommentsMessage("Error getting bike comments data");
            }
        }
        fetchBikeCommentsData()

        return function cleanup() {
            controller.abort();
        }
    }, [bike.bike_id, fetchCommentsAfterPost])


    async function handleFormSubmit(data) {
        setErrorPostingCommentMessage("");
        toggleDisableCommentButton(true);
        try {
            await axios.post(`${youBikeApiBaseUrl}/bike-comments/bikes/${bike.bike_id}`,
                {
                    comment: data.comment
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    }
                }
            );
            reset();
            toggleCommentSection(false);
            toggleFetchCommentsAfterPost(!fetchCommentsAfterPost);
        } catch (e) {
            console.error(e);
            setErrorPostingCommentMessage("Error posting bike comment data");
        } finally {
            toggleDisableCommentButton(false);
        }
    }

    function processNextRandomBike() {
        if (forHomePage === true) {
            nextRandomBikeFunction();
        }
    }

    return (
        <article className="bike-detail">
            {forHomePage && (
                <div>
                    <h2>Random Bike</h2>
                    <Button
                        type="button"
                        name="Next Random Bike"
                        variant="button-main"
                        onClick={() => processNextRandomBike()}
                    />
                    <Button
                        type="button"
                        name="Download Bike Image"
                        variant="button-main"
                        onClick={() => downloadBikeImageFunction()}
                        disabled={disableDownloadBikeImageButton}
                    />
                </div>
            )}
            <div className="bike-detail-container">
                {errorMessageNextRandomBike && <p className="error-message">{errorMessageNextRandomBike}</p>}
                {errorMessageDownloadBikeImage && <p className="error-message">{errorMessageDownloadBikeImage}</p>}
                <img className="bike-image" src={bikeImage} alt="bike image" />
                <p><span>Brand: </span>{bike.brand}</p>
                <p><span>Model: </span>{bike.model}</p>
                <p><span>Description: </span>{bike.description}</p>
                <p><span>Owner: </span>{bike.ownerName}</p>
                <div className="h2-container-bike-detail">
                    <h2>Comments</h2>
                    <Button
                        type="button"
                        name="Add Comment"
                        variant="button-main"
                        onClick={() => {user !== null
                            ? toggleCommentSection(true)
                            : navigate(`/sign-in`)}
                        }
                        disabled={disableCommentButton}
                    />
                    {commentSection && (
                        <form onSubmit={handleSubmit(handleFormSubmit)} className="comment-form-bike-detail">
                            <label htmlFor="user-comment">Share your thoughts about this bike
                                <textarea
                                    id="user-comment"
                                    {...register("comment", {
                                        required: {
                                            value: true,
                                            message: "Comment is required."
                                        },
                                        maxLength: {
                                            value: 255,
                                            message: "Comment must be at most 255 characters long."
                                        }
                                    }
                                )}
                                />
                            </label>
                            {errors.comment && <p className="error-message">{errors.comment.message}</p>}
                            <Button
                                type="submit"
                                name="Post comment"
                                variant="button-main"
                                disabled={disableCommentButton}
                            />
                        </form>
                    )}
                </div>
                {errorGettingCommentsMessage && <p className="error-message">{errorGettingCommentsMessage}</p>}
                {errorPostingCommentMessage && <p className="error-message">{errorPostingCommentMessage}</p>}
                {comments.length === 0
                    ? <p className="info-message info-message-home-page">No comments were made about this bike</p>
                    : comments.map((comment) => (
                        <BikeCommentCard
                            key={comment.bike_comment_id}
                            author={comment.authorName}
                        />
                    ))}
                </div>
        </article>
    )
}

export default BikeDetail;