import React from "react";

export default function ReviewTile(props) {
  return (
    <div>
      <div className="mx-2">
        <div className="d-flex justify-content-start gap-2">
          <p className="mb-0">
            <i className="fa fa-user"></i> {props.username}
          </p>
          <p className="text-muted mb-0">
            Rated: {props.rating}
            <span className="text-warning px-1">
              <i className="fa fa-star"></i>
            </span>
          </p>
        </div>
        <div className="mt-0 mx-3 text-muted">
          <p>{props.message}</p>
        </div>
      </div>
    </div>
  );
}
