package com.ssafy.soldsolve.db.repository;

import com.ssafy.soldsolve.db.entity.Notice;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NoticeRepository extends JpaRepository<Notice, Integer> {
//    Page<Notice> findAll(Pageable pageable);
}
