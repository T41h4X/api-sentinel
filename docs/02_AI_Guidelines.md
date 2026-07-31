# AI Development Guidelines

**Project:** API Sentinel  
**Version:** 1.0  
**Status:** Active

---

# 1. Purpose

This document defines the development standards for API Sentinel.

The objective is to ensure that every AI-generated output is:

- Consistent
- Maintainable
- Production-ready
- Secure
- Well documented
- Easy to understand
- Easy to extend

These guidelines apply to every implementation task throughout the project.

---

# 2. Development Philosophy

The project follows an AI-first development approach.

Artificial Intelligence is used to accelerate software development, but it is **not** responsible for engineering decisions.

Every AI-generated output must be:

- Reviewed
- Understood
- Tested
- Verified

before being committed.

Documentation is always considered the project's single source of truth.

If generated code conflicts with documentation, the documentation must be followed.

---

# 3. Project Documentation

Before implementing any feature, AI must read the project documentation.

Priority order:

1. Project Overview
2. AI Guidelines
3. Project Architecture
4. Implementation Roadmap
5. Database Design
6. API Design
7. User Flows
8. UI Design
9. Design System
10. Deployment Guide
11. Testing Strategy
12. Coding Standards
13. SRS

Never implement features without understanding the project context.

---

# 4. Task-Based Development

Development follows the Implementation Roadmap.

Each AI request must implement **only one roadmap task**.

Example:

✔ Implement T012

✘ Build authentication system

Large features must always be divided into small independent tasks.

A task is complete only when:

- Implementation is complete
- Code is reviewed
- Tests pass
- Documentation is updated
- Changes are committed

---

# 5. Standard AI Prompt

Every implementation request should follow this format.

```
Read:

- docs/01_Project_Overview.md
- docs/02_AI_Guidelines.md
- docs/03_Project_Architecture.md
- docs/04_Implementation_Roadmap.md

Implement ONLY Task TXXX.

Requirements:

- Do not modify unrelated files.
- Follow Clean Architecture.
- Follow SOLID principles.
- Follow project coding standards.
- Reuse existing components.
- Add proper documentation comments.
- Explain every created or modified file.
- Generate production-ready code only.
```

---

# 6. AI Responsibilities

AI may be used for:

- Implementation
- Refactoring
- Documentation
- Unit Tests
- Integration Tests
- SQL
- API Design
- Bug Fixing
- Optimization

AI must **not**:

- Invent project requirements
- Change architecture without instruction
- Modify unrelated files
- Remove existing functionality
- Ignore project documentation

---

# 7. Coding Principles

All generated code must follow:

- SOLID
- DRY
- KISS
- Clean Architecture
- Separation of Concerns
- Dependency Injection
- Composition over Inheritance

Avoid unnecessary complexity.

Prefer readability over clever code.

---

# 8. Code Quality

Generated code must be:

- Modular
- Reusable
- Testable
- Readable
- Maintainable

Avoid:

- Duplicate code
- Dead code
- Magic numbers
- Hardcoded values
- Long methods
- Large classes

---

# 9. File Organization

Create files only when necessary.

Avoid dumping everything into one file.

Recommended limits:

File Size

- Target: 200–300 lines
- Maximum: 500 lines

Function Size

- Target: 20–40 lines
- Maximum: 80 lines

Split code into modules whenever appropriate.

---

# 10. Naming Convention

Folders

```
lowercase
```

Files

```
kebab-case
```

Variables

```
camelCase
```

Functions

```
camelCase
```

Classes

```
PascalCase
```

Interfaces

```
PascalCase
```

Enums

```
PascalCase
```

Constants

```
UPPER_SNAKE_CASE
```

---

# 11. Code Commenting Standard

The project prioritizes readable and educational code.

Every important source file should begin with a header comment describing:

- Purpose
- Responsibilities
- Dependencies
- Related modules

Example:

```ts
/**
 * Authentication Service
 *
 * Purpose:
 * Handles user authentication and token management.
 *
 * Responsibilities:
 * - User login
 * - JWT generation
 * - Refresh token validation
 *
 * Dependencies:
 * UserService
 * JwtService
 */
```

Every public function should include documentation.

Example:

```ts
/**
 * Authenticate a user using email and password.
 *
 * @param email User email address
 * @param password User password
 *
 * @returns JWT access token
 *
 * @throws UnauthorizedException
 */
```

Inline comments should explain **WHY**, not **WHAT**.

Good

```ts
// Cache validation results to reduce repeated OpenAPI comparisons.
```

Bad

```ts
// Increment i
```

Use TODO comments like:

```ts
// TODO(T035):
// Add GraphQL validation support.
```

---

# 12. Error Handling

Never ignore exceptions.

Every error must be:

- Handled
- Logged
- Returned appropriately

Never expose:

- Stack traces
- Secrets
- Database information
- Tokens
- Passwords

Return meaningful error messages.

---

# 13. Logging

Every important operation should be logged.

Examples:

- Login
- Logout
- Validation
- Drift detection
- Uploads
- Critical errors

Never log:

- Passwords
- Tokens
- Secrets
- API Keys

Logs should be structured and meaningful.

---

# 14. Security

Always:

- Validate input
- Sanitize data
- Use HTTPS
- Use JWT
- Protect secrets
- Follow least privilege
- Validate uploaded files

Never:

- Hardcode credentials
- Trust client input
- Store plaintext passwords

---

# 15. Performance

Prefer:

- Pagination
- Lazy loading
- Database indexing
- Efficient queries
- Redis caching

Avoid premature optimization.

Optimize only after measuring.

---

# 16. Testing

Every implementation should include:

- Unit Tests

When applicable:

- Integration Tests
- End-to-End Tests

No feature should be considered complete without verification.

---

# 17. Documentation Rules

Whenever functionality changes:

Update the relevant documentation.

Examples:

- Architecture
- API Design
- Database Design
- User Flow
- Deployment

Documentation must always reflect the current implementation.

---

# 18. AI Output Requirements

After generating code, AI should explain:

1. Files created
2. Files modified
3. Why each file exists
4. How the implementation works
5. Dependencies introduced
6. Risks or limitations
7. Possible future improvements
8. Suggested commit message

---

# 19. Review Checklist

Before accepting AI-generated code verify:

- Documentation followed
- Correct roadmap task
- No unrelated changes
- Code builds
- No duplicate logic
- Proper comments included
- Error handling exists
- Tests pass
- Naming conventions followed
- Architecture respected

---

# 20. Definition of Done

A task is complete when:

- Requirements satisfied
- Code reviewed
- Tests passed
- Documentation updated
- No known critical issues remain
- Code committed

Only then should development continue to the next roadmap task.

---

# 21. Final Principle

Always write software that another developer can understand six months later.

Prioritize:

- Simplicity
- Readability
- Maintainability
- Consistency
- Documentation
- Correctness

AI should generate code that is not only functional but also educational, well-structured, and production-ready.
