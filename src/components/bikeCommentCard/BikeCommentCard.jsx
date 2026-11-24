import './BikeCommentCard.css'
import Button from "../button/Button.jsx";
import {transformDateTimeToScreenFormat} from "../../helpers/transformToScreenFormat.js";
import {useState} from "react";
import {useForm} from "react-hook-form";

function BikeCommentCard(
    {
        user,
        authorId,
        authorName,
        createdDateTime,
        updatedDateTime,
        comment,
        commentId,
        functionEditBikeComment,
        disableEditCommentButton,
        functionDeleteBikeComment,
        disableDeleteCommentButton,
    }) {
    const {register, handleSubmit, formState: {errors}} = useForm({mode: "onChange", defaultValues: {comment: comment}});
    const [updateCommentSection, toggleUpdateCommentSection] = useState(null);

    async function handleEditFormSubmit(data) {
        try {
            await functionEditBikeComment(commentId, data);
            toggleUpdateCommentSection(false);
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <div className="bike-comment-card-container">
            <div className="bike-comment-card-name-and-date-container">
                {authorName === null
                    ? <p><span>author is deleted</span></p>
                    : <p><span>{authorName}</span></p>
                }
                <div className="bike-comment-card-date-container">
                    <p><span>{transformDateTimeToScreenFormat(createdDateTime)}</span></p>
                    {transformDateTimeToScreenFormat(updatedDateTime) !== transformDateTimeToScreenFormat(createdDateTime) && (
                    <p><span>Edited {transformDateTimeToScreenFormat(updatedDateTime)}</span></p>
                        )}
                </div>
            </div>
            <p className="comment-bike-comment-card-component">{comment}</p>
            {user !== null && user.userRole === "ROLE_CYCLIST" && authorId === user.id && (
                <div>
                    <div className="bike-comment-card-edit-delete-buttons-container">
                        <Button
                            type="button"
                            name="edit"
                            variant="button-main-small"
                            onClick={() => toggleUpdateCommentSection(true)}
                        />
                        <Button
                            type="button"
                            name="Delete"
                            variant="button-main-delete-small"
                            onClick={() => functionDeleteBikeComment(commentId)}
                            disabled={disableDeleteCommentButton}
                        />
                    </div>
                    {updateCommentSection && (
                        <form onSubmit={handleSubmit(handleEditFormSubmit)} className="comment-form-bike-detail">
                            <label htmlFor="user-comment-edit">Update your comment
                                <textarea
                                    id="user-comment-edit"
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
                            <div className="bike-comment-card-save-cancel-buttons-container">
                                <Button
                                    type="submit"
                                    name="Save"
                                    variant="button-main"
                                    disabled={disableEditCommentButton}
                                />
                                <Button
                                    type="button"
                                    name="Cancel"
                                    variant="button-main"
                                    onClick={() => toggleUpdateCommentSection(false)}
                                />
                            </div>
                        </form>
                    )}
                </div>
            )}
        </div>
    )
}

export default BikeCommentCard;