-- CREATE "users" table if it is not exist
DO
$$
    BEGIN
        IF NOT EXISTS
            (SELECT 1
             FROM information_schema.tables
             WHERE table_schema = 'public'
               AND table_name = 'users'
            )
        THEN
            CREATE TABLE users
            (
                id         SERIAL PRIMARY KEY,
                first_name VARCHAR(50) NOT NULL,
                last_name  VARCHAR(50) NOT NULL,
                age        INTEGER,
                position   VARCHAR(50) NOT NULL

            );
        END IF;
    END
$$;

-- CREATE "profiles"
DO
$$
    BEGIN
        IF NOT EXISTS
            (SELECT 1
             FROM information_schema.tables
             WHERE table_schema = 'public'
               AND table_name = 'profiles'
            )
        THEN
            CREATE TABLE profiles
            (
                id           SERIAL PRIMARY KEY,
                user_id      INTEGER,
                email        VARCHAR(100),
                phone_number VARCHAR(50),
                FOREIGN KEY (user_id) REFERENCES users (id)

            );
        END IF;
    END
$$;

-- CREATE "products"
DO
$$
    BEGIN
        IF NOT EXISTS
            (SELECT 1
             FROM information_schema.tables
             WHERE table_schema = 'public'
               AND table_name = 'products'
            )
        THEN
            CREATE TABLE products
            (
                id   SERIAL PRIMARY KEY,
                name VARCHAR(100),
                cost DOUBLE PRECISION
            );
        END IF;
    END
$$;

-- CREATE "orders"
DO
$$
    BEGIN
        IF NOT EXISTS
            (SELECT 1
             FROM information_schema.tables
             WHERE table_schema = 'public'
               AND table_name = 'orders'
            )
        THEN
            CREATE TABLE orders
            (
                id       SERIAL PRIMARY KEY,
                user_id  INTEGER,
                sum_cost DOUBLE PRECISION,
                date     TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users (id)
            );
        END IF;
    END
$$;

-- CREATE "order_products"
DO
$$
    BEGIN
        IF NOT EXISTS
            (SELECT 1
             FROM information_schema.tables
             WHERE table_schema = 'public'
               AND table_name = 'order_products'
            )
        THEN
            CREATE TABLE order_products
            (
                id         SERIAL PRIMARY KEY,
                order_id   INTEGER,
                product_id INTEGER,
                FOREIGN KEY (order_id) REFERENCES orders (id),
                FOREIGN KEY (product_id) REFERENCES products (id)
            );
        END IF;
    END
$$;

-- CREATE "archive_users"
DO
$$
    BEGIN
        IF NOT EXISTS
            (SELECT 1
             FROM information_schema.tables
             WHERE table_schema = 'public'
               AND table_name = 'archive_users'
            )
        THEN
            CREATE TABLE archive_users
            (
                id         SERIAL PRIMARY KEY,
                first_name VARCHAR(50) NOT NULL,
                last_name  VARCHAR(50) NOT NULL,
                age        INTEGER,
                position   VARCHAR(50) NOT NULL

            );
        END IF;
    END
$$;

-- FILL "users" with fake data
DO
$$
    BEGIN
        IF NOT EXISTS
            (SELECT 1
             FROM public.users
             WHERE first_name = 'John'
               AND last_name = 'Doe'
            )
        THEN
            INSERT INTO public.users (id, first_name, last_name, age, position)
            VALUES (1, 'John', 'Doe', 26, 'Junior'),
                   (2, 'John', 'Smith', 45, 'Middle'),
                   (3, 'Sam', 'Smith', 34, 'Middle'),
                   (4, 'Bruce', 'Wayne', 42, 'Senior'),
                   (5, 'Bruce', 'Springsteen', 70, 'Senior'),
                   (6, 'John', 'Malkovich', 67, 'Senior'),
                   (7, 'Sam', 'Rockwell', 51, 'Middle');
        END IF;
    END
$$;

-- FILL "profiles"
DO
$$
    BEGIN
        IF NOT EXISTS
            (SELECT 1
             FROM public.profiles
             WHERE email = 'john.doe@gmail.com'
            )
        THEN
            INSERT INTO public.profiles (user_id, email, phone_number)
            VALUES (1, 'john.doe@gmail.com', '123-33-45-56'),
                   (2, 'john.smith@gmail.com', '234-55-10-11'),
                   (3, 'sam.smith@gmail.com', '345-30-11-22'),
                   (4, 'bruce.wayne@gmail.com', '123-11-22-33');
        END IF;
    END
$$;

-- FILL "products"
DO
$$
    BEGIN
        IF NOT EXISTS
            (SELECT 1
             FROM public.products
             WHERE name = 'Huawei P30 Lite 4/64GB'
               AND cost = 174.037
            )
        THEN
            INSERT INTO public.products (id, name, cost)
            VALUES (1, 'Huawei P30 Lite 4/64GB', 174.037),
                   (2, 'Samsung 860 Pro series 256GB 2.5" SATA III', 92.59),
                   (3, 'Asus PCI-Ex GeForce GTX 1050 Ti', 180.7),
                   (4, 'Mackie Big Knob Studio', 310),
                   (5, 'Gemix GDX-1000', 35.22),
                   (6, 'Apple MacBook Air 13" 256GB 2020', 1111.07),
                   (7, 'Lenovo IdeaPad S145-15AST', 229),
                   (8, '23.6" Acer ED242QRAbidpx', 164);
        END IF;
    END
$$;

-- FILL "orders"
DO
$$
    BEGIN
        IF NOT EXISTS
            (SELECT 1
             FROM public.orders
             WHERE id = 2
               AND sum_cost = 45.6
            )
        THEN
            INSERT INTO public.orders (id, user_id, sum_cost, date)
            VALUES (1, 1, 34, '2020-07-14 10:28:54.000000'),
                   (2, 1, 45.6, '2020-06-17 13:20:25.000000'),
                   (3, 2, 456.4, '2020-06-01 12:48:07.000000');
        END IF;
    END
$$;

-- FILL "order_products"
DO
$$
    BEGIN
        IF NOT EXISTS
            (SELECT 1
             FROM public.order_products
             WHERE id = 1
               AND order_id = 1
               AND product_id = 1
            )
        THEN
            INSERT INTO public.order_products (id, order_id, product_id)
            VALUES (1, 1, 1),
                   (2, 1, 2),
                   (3, 1, 3),
                   (4, 2, 4),
                   (5, 2, 5),
                   (6, 3, 6);
        END IF;
    END
$$;

-- FILL "archive_users"
DO
$$
    BEGIN
        IF NOT EXISTS
            (SELECT 1
             FROM public.archive_users
             WHERE first_name = 'Clark'
               AND last_name = 'Kent'
            )
        THEN
            INSERT INTO public.archive_users (id, first_name, last_name, age, position)
            VALUES (1, 'Clark', 'Kent', 48, 'Middle'),
                   (2, 'Dorian', 'Grey', 20, 'Junior'),
                   (3, 'Tony', 'Stark', 46, 'Senior');
        END IF;
    END
$$;

