import './BikeCommentCard.css'

function BikeCommentCard({author}) {
    return (
        <div className="bike-comment-card">
{/*CHECK OF AUTHOR NIET NULL IS (ALS CYCLIST IS GEDELETE)            */}
            <p>{author}</p>

        </div>
    )
}

export default BikeCommentCard;