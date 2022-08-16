package com.ssafy.soldsolve.db.repository;


import com.ssafy.soldsolve.db.entity.Tag;
import com.ssafy.soldsolve.db.entity.TagProduct;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TagProductRepository extends JpaRepository<TagProduct, Integer> {

    List<TagProduct> findByTag(Tag t);
}
