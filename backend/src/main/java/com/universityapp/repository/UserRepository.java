package com.universityapp.repository;

import com.universityapp.entity.User;
import com.universityapp.entity.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;
import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    Optional<User> findByUsername(String username);

    Optional<User> findByEmailAndIsActiveTrue(String email);

    List<User> findByRoleAndIsActiveTrue(UserRole role);

    boolean existsByEmail(String email);

    boolean existsByUsername(String username);
}
