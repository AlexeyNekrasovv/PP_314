package ru.kata.spring.boot_security.demo.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.dto.*;
import ru.kata.spring.boot_security.demo.entities.Role;
import ru.kata.spring.boot_security.demo.entities.User;
import ru.kata.spring.boot_security.demo.repositories.RoleRepository;
import ru.kata.spring.boot_security.demo.services.UserService;

import jakarta.validation.Valid;
import java.security.Principal;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/admin")
public class AdminController {

    private final UserService userService;
    private final RoleRepository roleRepository;
    private final UserMapper userMapper;

    public AdminController(UserService userService, RoleRepository roleRepository, UserMapper userMapper) {
        this.userService = userService;
        this.roleRepository = roleRepository;
        this.userMapper = userMapper;
    }

    @GetMapping("/currentUser")
    public ResponseEntity<UserResponseDTO> getCurrentUser(Principal principal) {
        User currentUser = userService.findByEmail(principal.getName());
        return ResponseEntity.ok(userMapper.toResponseDTO(currentUser));
    }

    @GetMapping("/users")
    public ResponseEntity<List<UserResponseDTO>> getAllUsers() {
        List<UserResponseDTO> users = userService.findAllUsers().stream()
                .map(userMapper::toResponseDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(users);
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<UserResponseDTO> getUserById(@PathVariable Long id) {
        User user = userService.findUserById(id);
        return ResponseEntity.ok(userMapper.toResponseDTO(user));
    }

    @PostMapping("/users")
    public ResponseEntity<UserResponseDTO> addUser(@RequestBody @Valid UserCreateDTO dto) {
        Set<Role> roles = new HashSet<>(roleRepository.findAllById(dto.getRoleIds()));
        User user = userMapper.toEntity(dto, roles);
        userService.saveUser(user);
        return new ResponseEntity<>(userMapper.toResponseDTO(user), HttpStatus.CREATED);
    }

    @PutMapping("/users/{id}")
    public ResponseEntity<UserResponseDTO> updateUser(@PathVariable("id") Long id,
                                                      @RequestBody @Valid UserUpdateDTO dto) {
        if (!dto.getId().equals(id)) {
            return ResponseEntity.badRequest().build();
        }
        User user = userService.findUserById(id);
        Set<Role> roles = new HashSet<>(roleRepository.findAllById(dto.getRoleIds()));
        userMapper.updateEntity(user, dto, roles);
        userService.updateUser(id, user);
        return ResponseEntity.ok(userMapper.toResponseDTO(user));
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable("id") Long id) {
        userService.deleteUser(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/users/roles")
    public ResponseEntity<List<RoleDTO>> getAllRoles() {
        List<RoleDTO> roles = roleRepository.findAll().stream()
                .map(userMapper::toRoleDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(roles);
    }
}