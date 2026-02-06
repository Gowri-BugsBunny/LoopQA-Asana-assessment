Design Benefits:

- Scalability: Adding test cases requires only JSON updates
- Maintainability: UI changes isolated to page objects
- Efficiency: Authentication handled once, reused across all tests
- Reliability: Resilient selectors with multiple fallback strategies

Tech Stack:

- Playwright - End-to-end testing framework
- TypeScript - Type-safe automation
- JSON - Structured test data

Key Features:

Data-Driven Testing
- All test scenarios driven from testData.json
- Add new test cases without writing code - just update JSON
- 6 test cases covering 2 projects, 3 columns, multiple task validations

Optimized Authentication
- One-time login via auth.setup.ts with session reuse
- Reduces test execution time by ~70% (25s vs 85s)
- Authentication state saved and shared across all tests

Page Object Model
- Clean separation between test logic and UI interactions
- Reusable components in LoginPage.ts and ProjectBoard.ts
- Resilient selectors with fallback strategies