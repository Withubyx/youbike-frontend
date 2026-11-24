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
    const [fetchComments, toggleFetchComments] = useState(false);
    const [commentSection, toggleCommentSection] = useState(false);
    const [commentSectionCyclistRestricted, setCommentSectionCyclistRestricted] = useState("");
    const [disablePostCommentButton, toggleDisablePostCommentButton] = useState(false);
    const [disableEditCommentButton, toggleDisableEditCommentButton] = useState(false);
    const [disableDeleteCommentButton, toggleDisableDeleteCommentButton] = useState(false);
    const [errorGetCommentsMessage, setErrorGetCommentsMessage] = useState("");
    const [errorPostCommentMessage, setErrorPostCommentMessage] = useState("");
    const [errorEditCommentMessage, setErrorEditCommentMessage] = useState("");
    const [errorDeleteCommentMessage, setErrorDeleteCommentMessage] = useState("");

    const token = localStorage.getItem("token");

    useEffect(() => {
        const controller = new AbortController();

        async function fetchBikeCommentsData() {
            setErrorGetCommentsMessage("")
            try {
                const result = await axios.get(`${youBikeApiBaseUrl}/bike-comments/bikes/${bike.bike_id}`,
                    {signal: controller.signal});
                setComments(result.data);
            } catch (e) {
                console.error(e);
                setErrorGetCommentsMessage("Error getting bike comments data");
            }
        }
        fetchBikeCommentsData()

        return function cleanup() {
            controller.abort();
        }
    }, [bike.bike_id, fetchComments])


    async function handlePostFormSubmit(data) {
        setErrorPostCommentMessage("");
        toggleDisablePostCommentButton(true);
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
            toggleFetchComments(!fetchComments);
        } catch (e) {
            console.error(e);
            setErrorPostCommentMessage("Error posting bike comment data");
        } finally {
            toggleDisablePostCommentButton(false);
        }
    }

    async function editBikeComment(commentId, data) {
        toggleDisableEditCommentButton(true)
        setErrorEditCommentMessage("")
        try {
            await axios.put(`${youBikeApiBaseUrl}/bike-comments/${commentId}`,
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
            toggleFetchComments(!fetchComments);
        } catch (e) {
            console.error(e);
            setErrorEditCommentMessage("Error editing bike comment data");
        } finally {
            toggleDisableEditCommentButton(false)
        }
    }

    async function deleteBikeComment(commentId) {
        toggleDisableDeleteCommentButton(true);
        setErrorDeleteCommentMessage("");
        try {
            await axios.delete(`${youBikeApiBaseUrl}/bike-comments/${commentId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }
            );
            toggleFetchComments(!fetchComments);
        } catch (e) {
            console.error(e);
            setErrorDeleteCommentMessage("Error deleting bike comment data");
        } finally {
            toggleDisableDeleteCommentButton(false);
        }
    }

    function processNextRandomBike() {
        if (forHomePage === true) {
            nextRandomBikeFunction();
        }
    }

    return (
        <article className="bike-detail-component-center">
            <div className="bike-detail-component-content">
            {forHomePage && (
                <div className="h2-random-bike-and-buttons-container">
                    <h2 className="h2-text-bike-detail-component">Random Bike</h2>
                    <div className="button-random-main-bike-detail-component">
                        <Button
                            type="button"
                            name="Next Random Bike"
                            variant="button-main"
                            onClick={() => processNextRandomBike()}
                        />
                    </div>
                    {errorMessageNextRandomBike && <p className="error-message">{errorMessageNextRandomBike}</p>}
                    <div className="button-random-main-bike-detail-component">
                        <Button
                            type="button"
                            name="Download Bike Image"
                            variant="button-main"
                            onClick={() => downloadBikeImageFunction()}
                            disabled={disableDownloadBikeImageButton}
                        />
                    </div>
                    {errorMessageDownloadBikeImage && <p className="error-message">{errorMessageDownloadBikeImage}</p>}
                </div>
            )}
            <div className="bike-detail-container-under-random-bike">
                <img className="bike-image-bike-detail-component" src={bikeImage} alt="bike image" />
                <p className="text-fit-element-bike-detail-component"><span>Brand: </span>{bike.brand}</p>
                <p className="text-fit-element-bike-detail-component"><span>Model: </span>{bike.model}</p>
                <p className="text-fit-element-bike-detail-component"><span>Description: </span>{bike.description}</p>
                <p className="text-fit-element-bike-detail-component"><span>Owner: </span>{bike.ownerName}</p>
                <div className="h2-comments-and-button-container">
                    <h2 className="h2-text-bike-detail-component">Comments</h2>
                    <div className="button-main-bike-detail-component">
                        <Button
                            type="button"
                            name="Add Comment"
                            variant="button-main"
                            onClick={() => user !== null
                                ? user.userRole === "ROLE_CYCLIST"
                                    ? toggleCommentSection(true)
                                    : setCommentSectionCyclistRestricted("Only Cyclists can place a comment")
                                : navigate(`/sign-in`)
                            }
                            disabled={disablePostCommentButton}
                        />
                    </div>
                </div>
                {commentSection && (
                    <form onSubmit={handleSubmit(handlePostFormSubmit)} className="comment-form-bike-detail">
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
                        <div className="bike-detail-post-and-cancel-comment-buttons-container">
                            <Button
                                type="submit"
                                name="Post comment"
                                variant="button-main"
                                disabled={disablePostCommentButton}
                            />
                            <Button
                                type="button"
                                name="Cancel"
                                variant="button-main"
                                onClick={() => toggleCommentSection(false)}
                            />
                        </div>
                    </form>
                )}
                {commentSectionCyclistRestricted && <p className="info-message info-message-home-page">{commentSectionCyclistRestricted}</p>}
                {errorGetCommentsMessage && <p className="error-message">{errorGetCommentsMessage}</p>}
                {errorPostCommentMessage && <p className="error-message">{errorPostCommentMessage}</p>}
                {errorEditCommentMessage && <p className="error-message">{errorEditCommentMessage}</p>}
                {errorDeleteCommentMessage && <p className="error-message">{errorDeleteCommentMessage}</p>}
                {comments.length === 0
                    ? <p className="info-message info-message-home-page">No comments were made about this bike</p>
                    : comments.map((comment) => (
                        <BikeCommentCard
                            key={comment.bike_comment_id}
                            user={user}
                            authorId={comment.authorId}
                            authorName={comment.authorName}
                            createdDateTime={comment.createdDateTime}
                            updatedDateTime={comment.updatedDateTime}
                            comment={comment.comment}
                            commentId={comment.bike_comment_id}
                            functionEditBikeComment={editBikeComment}
                            disableEditCommentButton={disableEditCommentButton}
                            functionDeleteBikeComment={deleteBikeComment}
                            disableDeleteCommentButton={disableDeleteCommentButton}
                        />
                    ))}
            </div>
            </div>
        </article>
    )
}

export default BikeDetail;