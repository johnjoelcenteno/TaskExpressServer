-- Check for existence of the Users table in the dbo schema
IF NOT EXISTS (
    SELECT
        1
    FROM
        sys.tables
    WHERE
        name = 'Users'
        AND schema_id = SCHEMA_ID('dbo')
) BEGIN -- Create the Users table
CREATE TABLE dbo.Users (
    UserId INT IDENTITY(1, 1) PRIMARY KEY,
    Username NVARCHAR(50) UNIQUE NOT NULL,
    PasswordHash NVARCHAR(255) NOT NULL,
    RefreshToken NVARCHAR(255),
    CreatedAt DATETIME DEFAULT GETDATE(),
    UpdatedAt DATETIME DEFAULT GETDATE()
);

END;

-- Check for existence of the Categories table in the dbo schema
IF NOT EXISTS (
    SELECT
        1
    FROM
        sys.tables
    WHERE
        name = 'Categories'
        AND schema_id = SCHEMA_ID('dbo')
) BEGIN -- Create the Categories table
CREATE TABLE dbo.Categories (
    CategoryId INT IDENTITY(1, 1) PRIMARY KEY,
    Title NVARCHAR(50) NOT NULL,
    UserId INT NOT NULL,
    CreatedAt DATETIME DEFAULT GETDATE(),
    UpdatedAt DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (UserId) REFERENCES dbo.Users(UserId) ON DELETE CASCADE -- Ensure categories belong to a user
);

END;

-- Check for existence of the Tasks table in the dbo schema
IF NOT EXISTS (
    SELECT
        1
    FROM
        sys.tables
    WHERE
        name = 'Tasks'
        AND schema_id = SCHEMA_ID('dbo')
) BEGIN -- Create the Tasks table
CREATE TABLE dbo.Tasks (
    TaskId INT IDENTITY(1, 1) PRIMARY KEY,
    UserId INT NOT NULL,
    CategoryId INT NOT NULL,
    Title NVARCHAR(255) NOT NULL,
    Description NVARCHAR(MAX) NULL,
    Status NVARCHAR(20) DEFAULT 'Pending',
    DueDate DATETIME NULL,
    CreatedAt DATETIME DEFAULT GETDATE(),
    UpdatedAt DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (UserId) REFERENCES dbo.Users(UserId) ON DELETE CASCADE,
    FOREIGN KEY (CategoryId) REFERENCES dbo.Categories(CategoryId) ON DELETE NO ACTION -- Remove cascading delete
);

END;

-- Populate Users table
IF NOT EXISTS (
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
    );

END;

-- Populate Categories table
IF NOT EXISTS (
    SELECT
        1
    FROM
        Categories
) BEGIN
INSERT INTO
    Categories (Title, UserId)
VALUES
    ('Today', 1),
    ('This week', 1),
    ('This month', 1)
END;

-- Populate Tasks table
IF NOT EXISTS (
    SELECT
        1
    FROM
        Tasks
) BEGIN
INSERT INTO
    Tasks (
        UserId,
        CategoryId,
        Title,
        Description,
        Status,
        CreatedAt,
        UpdatedAt
    )
VALUES
    (
        1,
        1,
        'Sample Task',
        'This is a sample task.',
        'Pending',
        GETDATE(),
        GETDATE()
    );

END;