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
    unitsAvailable int,
    pricePerUnit numeric
);

CREATE TABLE Meetings(
    id SERIAL PRIMARY KEY,
    name varchar(100),
    description varchar(256),
    location varchar(256),
    date timestamp
);

CREATE OR REPLACE PROCEDURE SPCreateUser(
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
    CALL SPCreateUser(name, email, address, phoneNumber, 'CLIENT');
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
    CALL SPCreateUser(name, email, address, phoneNumber, 'EMPLOYEE');
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
    unitsAvailable int,
    pricePerUnit numeric
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

    IF pricePerUnit < 0 THEN
        RAISE EXCEPTION 'Price per unit cannot be less than 0.0';
    END IF;

    INSERT INTO Inventory(name, description, unitsAvailable, pricePerUnit)
    VALUES (name, description, unitsAvailable, pricePerUnit);
END;
$$;

drop procedure SPUpdateItemByID;

CREATE OR REPLACE PROCEDURE SPUpdateItemByID(
    inId int,
    inName varchar,
    inDescription varchar,
    inUnitsAvailable int,
    inPricePerUnit numeric
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

    IF inPricePerUnit < 0 THEN
        RAISE EXCEPTION 'Price per unit cannot be less than 0.0';
    END IF;

    UPDATE Inventory
    SET name = inName, description = inDescription, unitsAvailable = inUnitsAvailable, pricePerUnit = inPricePerUnit
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

CREATE OR REPLACE PROCEDURE SPCreateMeeting(
    inName varchar(100),
    inDescription varchar(256),
    inLocation varchar(256),
    inDate timestamp
) LANGUAGE plpgsql
AS
$$
BEGIN
    IF inName IS NULL OR inName = '' OR LENGTH(inName) > 100 THEN
        RAISE EXCEPTION 'Name cannot be null, empty or greater than 100 characters.';
    END IF;

    IF inDescription IS NULL OR inDescription = '' OR LENGTH(inDescription) > 256 THEN
        RAISE EXCEPTION 'Address cannot be null or greater than 512 characters.';
    END IF;

    IF inDescription IS NULL OR inDescription = '' OR LENGTH(inLocation) > 256 THEN
        RAISE EXCEPTION 'Address cannot be null or greater than 512 characters.';
    END IF;

    INSERT INTO Meetings(name, description, location, date)
    VALUES (inName, inDescription, inLocation,inDate);
END;
$$;

CREATE OR REPLACE PROCEDURE SPUpdateMeetingByID(
    inId int,
    inName varchar,
    inDescription varchar,
    inLocation varchar,
    inDate timestamp
) LANGUAGE plpgsql
AS
$$
BEGIN
    IF inName IS NULL OR inName = '' OR LENGTH(inName) > 100 THEN
        RAISE EXCEPTION 'Name cannot be null, empty or greater than 100 characters.';
    END IF;

    IF inDescription IS NULL OR inDescription = '' OR LENGTH(inDescription) > 256 THEN
        RAISE EXCEPTION 'Address cannot be null or greater than 512 characters.';
    END IF;

    IF inDescription IS NULL OR inDescription = '' OR LENGTH(inLocation) > 256 THEN
        RAISE EXCEPTION 'Address cannot be null or greater than 512 characters.';
    END IF;

    UPDATE Meetings
    SET name = inName, description = inDescription, location = inLocation,  date = inDate
    WHERE id = inId;
END;
$$;

CREATE OR REPLACE PROCEDURE SPDeleteMeetingByID(
    inId int
) LANGUAGE plpgsql
AS
$$
BEGIN
    DELETE FROM Meetings
    WHERE id = inId;
END;
$$;

-- Clients Inserts
CALL SPCreateClient('Gabriela Jones', 'gabi@jones.com', '145 Ocean Drive, Beaufort, NC 28516', '987654321');
CALL SPCreateClient('Michael Brown', 'michael.brown@test.com', '23 Seabreeze Lane, Beaufort, NC 28518', '1234567890');
CALL SPCreateClient('David Miller', 'miller.david@mail.com', '514 Water Street, Beaufort, NC 28516', '258741963');
CALL SPCreateClient('Sarah Garcia', 'sarah.garcia@server.com', '879 Lighthouse Road, Beaufort, NC 28518', '852963714');
CALL SPCreateClient('William Rodriguez', 'william.rodriguez@test.com', '321 Anchor Drive, Beaufort, NC 28516', '741258963');
CALL SPCreateClient('Jennifer Hernandez', 'jennifer.hernandez@mail.com', '954 Oceanview Avenue, Beaufort, NC 28518', '147852369');
CALL SPCreateClient('Matthew Lopez', 'matthew.lopez@server.com', '128 Sandpiper Lane, Beaufort, NC 28516', '369852147');
CALL SPCreateClient('Ashley Moore', 'ashley.moore@test.com', '472 Sailfish Drive, Beaufort, NC 28518', '258136479');
CALL SPCreateClient('Daniel Lewis', 'daniel.lewis@mail.com', '639 Pelican Avenue, Beaufort, NC 28516', '632147850');
CALL SPCreateClient('Kimberly Clark', 'kimberly.clark@server.com', '785 Seagull Street, Beaufort, NC 28518', '963214785');
CALL SPCreateClient('Kevin Thomas', 'kevin.thomas@test.com', '251 Dolphin Drive, Beaufort, NC 28516', '814725963');
CALL SPCreateClient('Amanda Allen', 'amanda.allen@mail.com', '147 Whale Watch Lane, Beaufort, NC 28518', '725814936');
CALL SPCreateClient('James Johnson', 'james.johnson@server.com', '369 Shark Drive, Beaufort, NC 28516', '136947258');
CALL SPCreateClient('Stephanie Walker', 'stephanie.walker@test.com', '852 Marlin Avenue, Beaufort, NC 28518', '472581369');
CALL SPCreateClient('Christopher Williams', 'christopher.williams@mail.com', '124 Barracuda Lane, Beaufort, NC 28516', '213698574');
CALL SPCreateClient('Nicole Wilson', 'nicole.wilson@server.com', '457 Swordfish Drive, Beaufort, NC 28518', '852147369');
CALL SPCreateClient('Richard Garcia', 'richard.garcia@test.com', '789 Kingfish Avenue, Beaufort, NC 28516', '147852963');
CALL SPCreateClient('Elizabeth Hernandez', 'elizabeth.hernandez@mail.com', '258 Cobia Lane, Beaufort, NC 28518', '785214369');
CALL SPCreateClient('Joseph Lopez', 'joseph.lopez@server.com', '512 Flounder Drive, Beaufort, NC 28516', '421785369');

-- Employees Insets
CALL SPCreateEmployee('Michael', 'jordan@bulls.com', '123 Main St. Charlotte, NC 28202', '9876543210');
CALL SPCreateEmployee('Mia', 'hamilton@f1.com', '456 Elm St. Greensboro, NC 27401', '1234567890');
CALL SPCreateEmployee('William', 'shakespear@lit.com', '789 Oak St. Raleigh, NC 27603', '0987654321');
CALL SPCreateEmployee('Emily', 'dickinson@poetry.com', '1011 Pine St. Asheville, NC 28801', '2134567890');
CALL SPCreateEmployee('Christopher', 'columbus@explore.com', '1314 Maple St. Wilmington, NC 28401', '3214567890');
CALL SPCreateEmployee('Isabella', 'queen@spain.com', '1516 Cedar St. Winston-Salem, NC 27101', '4321456789');
CALL SPCreateEmployee('Alexander', 'graham@bell.com', '1718 Birch St. Durham, NC 27701', '5432145678');
CALL SPCreateEmployee('Evelyn', 'woods@books.com', '1920 Poplar St. Fayetteville, NC 28301', '6543214567');
CALL SPCreateEmployee('Benjamin', 'franklin@science.com', '2122 Spruce St. Cary, NC 27511', '7654321456');
CALL SPCreateEmployee('Charlotte', 'bronte@novels.com', '2324 Sycamore St. High Point, NC 27260', '8765432145');
CALL SPCreateEmployee('Noah', 'wiley@arca.com', '2526 Willow St. Gastonia, NC 28052', '9876543210');
CALL SPCreateEmployee('Sophia', 'loren@italy.com', '2728 Hickory St. Concord, NC 28027', '0987654321');
CALL SPCreateEmployee('James', 'bond@secret.com', '2930 Cypress St. Kannapolis, NC 28081', '2134567890');
CALL SPCreateEmployee('Olivia', 'newton@john.com', '3132 Dogwood St. Jacksonville, NC 28409', '3214567890');
CALL SPCreateEmployee('Lucas', 'skywalker@wars.com', '3334 Elm St. Greensboro, NC 27401', '4321456789');
CALL SPCreateEmployee('Ava', 'gardner@hollywood.com', '3536 Maple St. Wilmington, NC 28401', '5432145678');
CALL SPCreateEmployee('Elijah', 'wood@lotr.com', '3738 Oak St. Durham, NC 27701', '6543214567');

-- Meetings Inserts
CALL SPCreateMeeting('Joseph newton', 'In this meeting, we will discuss the vision for the new pool and explore design options, budget considerations, and permitting requirements.', '3738 Oak St. Durham, NC 27701', '2024-07-23 14:50');
CALL SPCreateMeeting('Alexandra Jones', 'Meeting to finalize pool design and secure permits.', '145 Falling Creek Dr. Greensboro, NC 27408', '2024-07-10 10:00');
CALL SPCreateMeeting('Michael Brown', 'Consultation on pool heater options and installation.', '21 Dogwood Lane, Charlotte, NC 28270', '2024-07-17 16:30');
CALL SPCreateMeeting('Elizabeth Hernandez', 'Discuss minor pool repairs and maintenance plan.', '884 Longview Rd. Asheville, NC 28803', '2024-07-25 11:15');
CALL SPCreateMeeting('William Miller', 'Initial meeting to explore pool construction possibilities.', '312 Winding Creek Way, Raleigh, NC 27604', '2024-08-01 09:00');
CALL SPCreateMeeting('David Garcia', 'Follow-up meeting to review pool construction timeline.', '542 Azalea Lane, Wilmington, NC 28403', '2024-07-12 14:00');
CALL SPCreateMeeting('Sarah Thompson', 'Meeting to brainstorm ideas for backyard oasis with pool.', '1008 Lakeview Dr. Fayetteville, NC 28303', '2024-07-19 12:15');
CALL SPCreateMeeting('Daniel Robinson', 'Consultation on pool chemical balancing and maintenance.', '777 Sunset Blvd. Winston-Salem, NC 27103', '2024-07-26 08:30');
CALL SPCreateMeeting('Jennifer Williams', 'Discuss options for pool decking materials and installation.', '987 Green Gables Dr. Cary, NC 27513', '2024-08-02 15:00');
CALL SPCreateMeeting('Charles Moore', 'Meeting to review final pool design and budget.', '456 Oakridge Dr. High Point, NC 27260', '2024-07-11 11:00');
CALL SPCreateMeeting('Kimberly Anderson', 'Consultation on pool lighting options and installation.', '234 Evergreen St. Gastonia, NC 28052', '2024-07-18 09:30');
CALL SPCreateMeeting('Richard Taylor', 'Meeting to discuss potential pool leak and repairs.', '654 Meadow Lane, Jacksonville, NC 28540', '2024-07-24 15:45');
CALL SPCreateMeeting('Susan Baker', 'Follow-up meeting to address pool safety concerns.', '123 Main St. Concord, NC 28027', '2024-08-03 10:00');
CALL SPCreateMeeting('Christopher Clark', 'Initial meeting to explore options for pool renovation.', '45 Maple St. Kannapolis, NC 28081', '2024-07-15 17:00');
CALL SPCreateMeeting('Amanda Johnson', 'Consultation on pool winterization services.', '789 Elm St. Salisbury, NC 28146', '2024-07-20 14:00');
CALL SPCreateMeeting('Matthew Davis', 'Meeting to discuss pool maintenance schedule and pricing.', '23 Elmwood Dr. Mooresville, NC 28115', '2024-07-27 10:30');
CALL SPCreateMeeting('Lauren Garcia', 'Follow-up meeting to review pool construction progress.', '542 Azalea Lane, Wilmington, NC 28403', '2024-07-19 08:00');
CALL SPCreateMeeting('Nicholas Jackson', 'Consultation on pool liner replacement options.', '1001 Lakeview Pkwy. Hickory, NC 28601', '2024-10-28');

-- Items inserts
CALL SPCreateItem('Hayward Super Pump', 'High-performance pump designed for inground pools, known for its reliability and efficient operation.', '13', '500');
CALL SPCreateItem('Raypak Digital Heater', 'Energy-efficient heater suitable for both above ground and inground pools, with digital controls for easy temperature management.', '1', '1500');
CALL SPCreateItem('Polaris 280 Pressure Side Pool Cleaner', 'Automatic pool cleaner that effectively removes debris and keeps the pool clean.', '2', '600');
CALL SPCreateItem('NPT Mosaic Tiles', 'Decorative tiles for pool interiors and waterlines, available in various designs and materials. Sold per square foot', '0', '10');
CALL SPCreateItem('Luxury Hot Tubs', 'Designed for relaxation and hydrotherapy, with multiple seating configurations and jet options.', '1', '7500');
CALL SPCreateItem('Chlorine Bucket', 'Chemical for pool maintenance to keep water clean and safe.', '5', '50');
CALL SPCreateItem('Solar Pool Cover', 'Helps retain heat and reduce water evaporation, suitable for various pool sizes.', '1', '150');
CALL SPCreateItem('Pool Safety Fence', 'Removable mesh fence for pool safety, helps prevent unauthorized access.', '1', '500');
CALL SPCreateItem('Pentair IntelliChlor Salt Chlorine Generator', 'Automatically converts salt into chlorine to sanitize pool water, providing an alternative to traditional chlorine.', '1', '1200');
CALL SPCreateItem('LED Pool Lights', 'Energy-efficient LED lights designed for pools, available in various colors and styles.', '3', '200');
CALL SPCreateItem('Automatic Pool Cover', 'Motorized cover that provides safety and helps maintain pool temperature, easy to operate.', '1', '3000');
CALL SPCreateItem('Pool Lounge Chairs', 'Comfortable and durable chairs designed for poolside relaxation.', '2', '150');
CALL SPCreateItem('Outdoor Fire Pit', 'Stylish fire pit for outdoor entertaining, available in various designs.', '1', '500');