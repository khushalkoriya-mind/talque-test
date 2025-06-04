module.exports = {
  extends: ["@commitlint/config-conventional"],
  // Validate for issue/ticket numbers
  parserPreset: {
    parserOpts: {
      // these are samples, add possible prefixes based on your project requirement
      issuePrefixes: ["ANDR-", "TEST-", "DSC-", "ABC-", "CO-"],
    },
  },
  rules: {
    "body-leading-blank": [1, "always"],
    "footer-leading-blank": [1, "always"],
    "header-max-length": [2, "always", 72],
    "scope-case": [2, "always", "lower-case"],
    "subject-case": [
      2,
      "never",
      ["sentence-case", "start-case", "pascal-case", "upper-case"],
    ],
    "subject-empty": [2, "never"],
    "subject-full-stop": [2, "never", "."],
    "type-case": [2, "always", "lower-case"],
    "type-empty": [2, "never"],
    "type-enum": [
      2,
      "always",
      [
        "build",
        "chore",
        "ci",
        "docs",
        "feat",
        "feature",
        "fix",
        "perf",
        "refactor",
        "revert",
        "style",
        "test",
      ],
    ],
  },
};

// Example Commit Message:

// git commit -m "feat(ANDR-123): implement new feature

// this is the body of the commit message, providing more details about the change.

// footer information can be added here if necessary."
