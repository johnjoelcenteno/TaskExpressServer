-- Create Users table if it does not exist
IF NOT EXISTS (
    SELECT
        1
    FROM
        sys.tables
    WHERE
        name = 'Users'
        AND schema_id = SCHEMA_ID('dbo')
) BEGIN CREATE TABLE Users (
    UserId INT IDENTITY(1, 1) PRIMARY KEY,
    Username NVARCHAR(50) UNIQUE NOT NULL,
    PasswordHash NVARCHAR(255) NOT NULL,
    RefreshToken NVARCHAR(255),
    CreatedAt DATETIME DEFAULT GETDATE(),
    UpdatedAt DATETIME DEFAULT GETDATE()
);

END;

-- Create Tasks table if it does not exist
IF NOT EXISTS (
    SELECT
        1
    FROM
        sys.tables
    WHERE
        name = 'Tasks'
        AND schema_id = SCHEMA_ID('dbo')
) BEGIN CREATE TABLE Tasks (
    TaskId INT IDENTITY(1, 1) PRIMARY KEY,
    UserId INT NOT NULL,
    Title NVARCHAR(255) NOT NULL,
    Description NVARCHAR(MAX) NULL,
    Status NVARCHAR(20) DEFAULT 'Pending',
    DueDate DATETIME NULL,
    CreatedAt DATETIME DEFAULT GETDATE(),
    UpdatedAt DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (UserId) REFERENCES Users(UserId) ON DELETE CASCADE
);

END;

-- populate users table
IF NOT EXISTS(
    SELECT
        1
    FROM
        Users
) BEGIN
INSERT INTO
    Users (Username, PasswordHash)
VALUES
    (
        'Joel',
        '$2b$13$cTwa.l6/263eX64P9rWL.eVBAgWE9dimW2Hv13TDm.xnuueYqiCZO'
    )
END;

-- populate tasks table
IF NOT EXISTS(
    SELECT
        1
    FROM
        Tasks
) BEGIN
INSERT INTO
    Tasks (
        UserId,
        Title,
        Description,
        Status,
        CreatedAt,
        UpdatedAt
    )
VALUES
    (
        1,
        'Sample Task',
        'This is a sample task.',
        'Pending',
        GETDATE(),
        GETDATE()
    );

END;