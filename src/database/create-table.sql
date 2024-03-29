CREATE TABLE IF NOT EXISTS sessions(
	user_id varchar(100) UNIQUE NOT NULL,
	user_session varchar(100) UNIQUE NOT NULL,
	user_ip varchar(100) NOT NULL,
	user_agent varchar(300) NOT NULL
);

