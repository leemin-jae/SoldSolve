package com.ssafy.soldsolve.db.repository;

import com.ssafy.soldsolve.db.entity.Review;
import com.ssafy.soldsolve.db.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Integer> {
    Review findByReviewerAndReviewee(User Reviewer, User Reviewee);
//    Review findByReviewerAndReviewid(User Reviewer, int reviewId);
    List<Review> findAllByReviewee(User Reviewee);
}
