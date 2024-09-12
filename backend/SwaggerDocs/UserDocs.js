/**
 * @swagger
 * /career/register:
 *  post:
 *    summary: User registration
 *    description: API to register a new user by providing email, password, and role.
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              email:
 *                type: string
 *                example: "user@example.com"
 *                description: "User's email address"
 *              password:
 *                type: string
 *                example: "password123"
 *                description: "User's password"
 *              role:
 *                type: string
 *                enum: ['user', 'admin']
 *                example: "user"
 *                description: "User's role, either 'user' or 'admin'"
 *    responses:
 *      200:
 *        description: User registered successfully
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: "User registered successfully"
 *                data:
 *                  type: object
 *                  properties:
 *                    email:
 *                      type: string
 *                      example: "user@example.com"
 *                    role:
 *                      type: string
 *                      example: "user"
 *                    isVerified:
 *                      type: boolean
 *                      example: false
 *      400:
 *        description: Bad Request - Invalid input data
 *      500:
 *        description: Internal server error
 */


/**
 * @swagger
 * /career/login:
 *  post:
 *    summary: User login
 *    description: API to log in a user by providing email, password, and role.
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              email:
 *                type: string
 *                example: "youremail@gmail.com"
 *                description: "User's email address"
 *              password:
 *                type: string
 *                example: "user123@"
 *                description: "Enter user password"
 *              role:
 *                type: string
 *                enum: ['user', 'admin']
 *                example: 'user'
 *                description: "Enter the role 'user' or 'admin'"
 *    responses:
 *      200:
 *        description: User logged in successfully
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: "User logged in successfully"
 *                token:
 *                  type: string
 *                  example: "etylacjsaJsjhKdaNsfsgjacGC....."
 *      401:
 *        description: Unauthorized - Invalid credentials
 *      500:
 *        description: Internal server error
 */
