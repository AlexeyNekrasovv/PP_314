package ru.kata.spring.boot_security.demo.repositories;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Repository;
import ru.kata.spring.boot_security.demo.entities.User;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    @EntityGraph(attributePaths = "roles")
    Optional<User> findByEmail(String email);

    @Override
    @NonNull
    @EntityGraph(attributePaths = "roles")
    List<User> findAll();

    @Override
    @NonNull
    @EntityGraph(attributePaths = "roles")
    Optional<User> findById(@NonNull Long id);
}
