const spicedPg = require("spiced-pg");
const dbURL = "postgres://alessandroaiello@localhost:5432/social-network";
const db = spicedPg(dbURL);

exports.addUser = (username, firstname, lastname, email, hashed_password) => {
    return db.query(
        `
        INSERT INTO 
            users (username, firstname, lastname, email, hashed_password)
        VALUES
            ($1,$2,$3,$4,$5)
        RETURNING
            *;
        `,
        [username, firstname, lastname, email, hashed_password]
    );
};

exports.updatePassword = (email, hashed_newPassword) => {
    return db.query(
        `
    UPDATE 
        users
    SET
        hashed_password = $2
    WHERE
        email = $1
        `,
        [email, hashed_newPassword]
    );
};

exports.addResetCode = (email, reset_code) => {
    return db.query(
        `
        INSERT INTO 
            reset_codes (email, reset_code)
        VALUES
            ($1,$2)
        RETURNING
            *;
        `,
        [email, reset_code]
    );
};

exports.updatePictureURL = (email, new_profile_picture_url) => {
    return db.query(
        `
        UPDATE 
            users
        SET 
            profile_picture_url =  $2
        WHERE
            email = $1
        RETURNING 
            *
    `,
        [email, new_profile_picture_url]
    );
};

exports.updateBio = (email, newBio) => {
    return db.query(
        `
        UPDATE 
            users
        SET 
            bio =  $2
        WHERE
            email = $1
        RETURNING 
            *
    `,
        [email, newBio]
    );
};

exports.getUserByEmail = (email) => {
    return db.query(`SELECT * FROM users WHERE email = $1`, [email]);
};

exports.getUserByID = (userID) => {
    return db.query(`SELECT * FROM users WHERE id = $1`, [userID]);
};

exports.getFriendsRequest = (user_id, other_id) => {
    return db.query(
        `
    SELECT 
        * 
    FROM
        friend_requests 
    WHERE 
        (from_id = $1 AND to_id = $2)
    OR
        (to_id = $1 AND from_id = $2);
    `,
        [user_id, other_id]
    );
};

exports.getResetCodeByEmail = (email) => {
    return db.query(
        `
    SELECT 
           reset_code 
    FROM 
         reset_codes 
    WHERE 
          email=$1
    AND 
          CURRENT_TIMESTAMP - created_at < INTERVAL '10 minutes'
    ORDER BY
        created_at DESC;
    `,
        [email]
    );
};

exports.getUserByUsername = (username) => {
    return db.query(`SELECT * FROM users WHERE username = $1`, [username]);
};

exports.getUserListByName = (query) => {
    return db.query(
        `SELECT * FROM users WHERE firstname ILIKE $1
ORDER BY created_at DESC`,
        [query + "%"]
    );
};

exports.addRequest = (userID, otherID) => {
    return db.query(
        `INSERT INTO friend_requests 
            (from_id, to_id, accepted) 
        VALUES 
               ($1,$2, false) 
        RETURNING 
            *
            `,
        [userID, otherID]
    );
};

exports.deleteRequest = (userID, otherID) => {
    return db.query(
        `
    DELETE FROM
        friend_requests
    WHERE 
        to_id = $1 AND from_id = $2
    OR 
        to_id = $2 AND from_id = $1
    RETURNING 
        *
    `,
        [userID, otherID]
    );
};

exports.acceptRequest = (userID, otherID) => {
    return db.query(
        `
    UPDATE
        friend_requests
    SET
        accepted = true
    WHERE
        to_id = $1 AND from_id = $2
    OR
        to_id = $2 AND from_id = $1
    RETURNING
        *
    `,
        [userID, otherID]
    );
};

exports.getFriendsAndWannabes = (userID) => {
    return db.query(
        `
    SELECT
            users.id, firstname, lastname, profile_picture_url, accepted
        FROM friend_requests
        JOIN users
            ON (from_id=users.id AND to_id=$1          AND accepted=false)
            OR (from_id=users.id AND to_id=$1          AND accepted=true)
            OR (from_id=$1        AND to_id=users.id   AND accepted=true);
    `,
        [userID]
    );
};
