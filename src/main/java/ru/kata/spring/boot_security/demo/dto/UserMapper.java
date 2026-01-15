package ru.kata.spring.boot_security.demo.dto;

import org.springframework.stereotype.Component;
import ru.kata.spring.boot_security.demo.entities.Role;
import ru.kata.spring.boot_security.demo.entities.User;

import java.util.Set;
import java.util.stream.Collectors;

@Component
public class UserMapper {

    public UserResponseDTO toResponseDTO(User user) {
        Set<RoleDTO> roleDTOs = user.getRoles().stream()
                .map(this::toRoleDTO)
                .collect(Collectors.toSet());

        return new UserResponseDTO(
                user.getId(),
                user.getFirstName(),
                user.getLastName(),
                user.getAge(),
                user.getEmail(),
                roleDTOs
        );
    }

    public RoleDTO toRoleDTO(Role role) {
        return new RoleDTO(role.getId(), role.getName());
    }

    public User toEntity(UserCreateDTO dto, Set<Role> roles) {
        User user = new User();
        user.setFirstName(dto.getFirstName());
        user.setLastName(dto.getLastName());
        user.setAge(dto.getAge());
        user.setEmail(dto.getEmail());
        user.setPassword(dto.getPassword());
        user.setRoles(roles);
        return user;
    }

    public void updateEntity(User user, UserUpdateDTO dto, Set<Role> roles) {
        user.setFirstName(dto.getFirstName());
        user.setLastName(dto.getLastName());
        user.setAge(dto.getAge());
        user.setEmail(dto.getEmail());
        if (dto.getPassword() != null && !dto.getPassword().isBlank()) {
            user.setPassword(dto.getPassword());
        }
        user.setRoles(roles);
    }
}
