DROP DATABASE IF EXISTS signaturepools;

CREATE DATABASE signaturepools;

CREATE TABLE Users(
    id SERIAL PRIMARY KEY,
    name varchar(100),
    email varchar(256),
    address varchar(1024),
    phoneNumber varchar(32),
    type varchar(16)
);

CREATE TABLE Inventory(
    id SERIAL PRIMARY KEY,
    name varchar(100),
    description varchar(512),
    unitsAvailable int
);

CREATE TABLE Meetings(
    id SERIAL PRIMARY KEY,
    name varchar(100),
    date timestamp
);

DROP PROCEDURE SPICreateUser;

CREATE OR REPLACE PROCEDURE SPICreateUser(
    name varchar,
    email varchar,
    address varchar,
    phoneNumber varchar,
    type varchar
)
LANGUAGE plpgsql
AS $$
BEGIN
    IF name IS NULL OR name = '' OR LENGTH(name) > 100 THEN
        RAISE EXCEPTION 'Name cannot be null, empty or greater than 100 characters.';
    END IF;

    IF email IS NULL OR email = '' THEN
        RAISE EXCEPTION 'Email cannot be null or empty.';
    END IF;

    IF  NOT(email ~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$') THEN
        RAISE EXCEPTION 'Email format is not correct.';
    END IF;

    IF address IS NULL THEN
        RAISE EXCEPTION 'Address cannot be null or empty.';
    END IF;

    IF LENGTH(address) > 512 THEN
        RAISE EXCEPTION 'Address cannot be greater than 512 characters.';
    END IF;

    IF phoneNumber IS NULL OR phoneNumber = '' THEN
         RAISE EXCEPTION 'PhoneNumber cannot be null or empty.';
    END IF;

    IF NOT (phoneNumber ~ '^[0-9]+$' OR phoneNumber ~ '^\+[0-9]+$') THEN
        RAISE EXCEPTION 'PhoneNumber only can contain numbers or start with a + followed by numbers.';
    END IF;

    IF UPPER(type) <> 'CLIENT' AND UPPER(type) <> 'EMPLOYEE' THEN
         RAISE EXCEPTION 'Type only can be client of employee';
    END IF;

    INSERT INTO Users(name, email, address, phoneNumber, type)
    VALUES (name, email, address, phoneNumber, UPPER(type));
END;
$$;

CREATE OR REPLACE PROCEDURE SPCreateClient(
    name varchar,
    email varchar,
    address varchar,
    phoneNumber varchar
)
LANGUAGE plpgsql
AS $$
BEGIN
    CALL SPICreateUser(name, email, address, phoneNumber, 'CLIENT');
END;
$$;

CREATE OR REPLACE PROCEDURE SPCreateEmployee(
    name varchar,
    email varchar,
    address varchar,
    phoneNumber varchar
)
LANGUAGE plpgsql
AS $$
BEGIN
    CALL SPICreateUser(name, email, address, phoneNumber, 'EMPLOYEE');
END;
$$;

CREATE OR REPLACE PROCEDURE SPUpdateUserByID(
    inId int,
    inName varchar,
    inEmail varchar,
    inAddress varchar,
    inPhoneNumber varchar
)
LANGUAGE plpgsql
AS $$
BEGIN
    IF inName IS NULL OR inName = '' OR LENGTH(inName) > 100 THEN
        RAISE EXCEPTION 'Name cannot be null, empty or greater than 100 characters.';
    END IF;

    IF inEmail IS NULL OR inEmail = '' THEN
        RAISE EXCEPTION 'Email cannot be null or empty.';
    END IF;

    IF  NOT(inEmail ~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$') THEN
        RAISE EXCEPTION 'Email format is not correct.';
    END IF;

    IF inAddress IS NULL THEN
        RAISE EXCEPTION 'Address cannot be null or empty.';
    END IF;

    IF LENGTH(inAddress) > 512 THEN
        RAISE EXCEPTION 'Address cannot be greater than 512 characters.';
    END IF;

    IF inPhoneNumber IS NULL OR inPhoneNumber = '' THEN
         RAISE EXCEPTION 'PhoneNumber cannot be null or empty.';
    END IF;

    IF NOT (inPhoneNumber ~ '^[0-9]+$' OR inPhoneNumber ~ '^\+[0-9]+$') THEN
        RAISE EXCEPTION 'PhoneNumber only can contain numbers or start with a + followed by numbers.';
    END IF;

    UPDATE Users
    SET name = inName, email = inEmail, address = inAddress, phoneNumber = inPhoneNumber
    WHERE id = inId;
END;
$$;

CREATE OR REPLACE PROCEDURE SPDeleteUserByID(
    inId int
)
LANGUAGE plpgsql
AS $$
BEGIN
    DELETE FROM Users
    WHERE id = inId;
END;
$$;

CREATE OR REPLACE PROCEDURE SPCreateItem(
    name varchar,
    description varchar,
    unitsAvailable int
)LANGUAGE plpgsql
AS $$
BEGIN
    IF name IS NULL OR name = '' OR LENGTH(name) > 100 THEN
        RAISE EXCEPTION 'Name cannot be null, empty or greater than 100 characters.';
    END IF;

    IF description IS NULL OR description = '' OR LENGTH(description) > 512 THEN
        RAISE EXCEPTION 'Address cannot be null or greater than 512 characters.';
    END IF;

    IF unitsAvailable < 0 THEN
        RAISE EXCEPTION 'Units Availabe cannot be less than 0.';
    END IF;

    INSERT INTO Inventory(name, description, unitsAvailable)
    VALUES (name, description, unitsAvailable);
END;
$$;

CREATE OR REPLACE PROCEDURE SPUpdateItemByID(
    inId int,
    inName varchar,
    inDescription varchar,
    inUnitsAvailable int
) LANGUAGE plpgsql
AS $$
BEGIN
    IF inName IS NULL OR inName = '' OR LENGTH(inName) > 100 THEN
        RAISE EXCEPTION 'Name cannot be null, empty or greater than 100 characters.';
    END IF;

    IF inDescription IS NULL OR inDescription = '' OR LENGTH(inDescription) > 512 THEN
        RAISE EXCEPTION 'Address cannot be null or greater than 512 characters.';
    END IF;

    IF inUnitsAvailable < 0 THEN
        RAISE EXCEPTION 'Units Availabe cannot be less than 0.';
    END IF;

    UPDATE Inventory
    SET name = inName, description = inDescription, unitsAvailable = inUnitsAvailable
    WHERE id = inId;
END;
$$;

CREATE OR REPLACE PROCEDURE SPDeleteItemByID(
    inId int
) LANGUAGE plpgsql
AS $$
BEGIN
    DELETE FROM Inventory
    WHERE id = inId;
END;
$$;