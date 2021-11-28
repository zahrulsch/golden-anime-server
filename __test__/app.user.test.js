const request = require('supertest')
const { User } = require('../models')
const app = require('../app')
let access_token = ''

describe('user register endpoint test', () => {
  beforeAll(async () => {
    await User.destroy({
      where: {
        username: 'zahrulsch_test'
      }
    })
  })

  const data = {
    username: 'zahrulsch_test',
    email: 'test@email.com',
    password: 'password',
    imageUrl: 'https://ik.imagekit.io/q8c93uv11zf/john_wick_ThFZK1ORAE5.jpg?updatedAt=1635601028767',
    gender: 'male'
  }

  it('send with normal data', (done) => {
    request(app)
      .post('/users/register')
      .send(data)
      .set('Accept', 'application/json')
      .expect(201)
      .expect(({body}) => {
        expect(body.message).toEqual('success')
        expect(body.data).toEqual(expect.not.objectContaining({ password: expect.any(String) }))
      })
      .end(err => done(err))
  })

  it('send with duplicate email', (done) => {
    request(app)
      .post('/users/register')
      .send(data)
      .set('Accept', 'application/json')
      .expect(400)
      .expect(({ body }) => {
        expect(body.message).toMatch(/^(?=.*email)(?=.*unique).*$/)
      })
      .end(e => done(e))
  })

  it('send with null username', (done) => {
    const dataNoUsername = {
      email: 'test2@email.com',
      password: 'password',
      imageUrl: 'https://ik.imagekit.io/q8c93uv11zf/john_wick_ThFZK1ORAE5.jpg?updatedAt=1635601028767',
      gender: 'male'
    }
    request(app)
      .post('/users/register')
      .send(dataNoUsername)
      .set('Accept', 'application/json')
      .expect(400)
      .expect(({body}) => {
        expect(body.message).toMatch(/^(?=.*username)(?=.*null).*$/)
      })
      .end(e => done(e))
  })

  it('send with empty username', (done) => {
    const dataNoUsername = {
      username: '',
      email: 'test2@email.com',
      password: 'password',
      imageUrl: 'https://ik.imagekit.io/q8c93uv11zf/john_wick_ThFZK1ORAE5.jpg?updatedAt=1635601028767',
      gender: 'male'
    }
    request(app)
      .post('/users/register')
      .send(dataNoUsername)
      .set('Accept', 'application/json')
      .expect(400)
      .expect(({body}) => {
        expect(body.message).toMatch(/^(?=.*username)(?=.*empty).*$/)
      })
      .end(e => done(e))
  })

  it('send with null email', (done) => {
    const dataNoUsername = {
      username: 'username_test',
      password: 'password',
      imageUrl: 'https://ik.imagekit.io/q8c93uv11zf/john_wick_ThFZK1ORAE5.jpg?updatedAt=1635601028767',
      gender: 'male'
    }
    request(app)
      .post('/users/register')
      .send(dataNoUsername)
      .set('Accept', 'application/json')
      .expect(400)
      .expect(({body}) => {
        expect(body.message).toEqual(expect.stringContaining('email cannot be null'))
        expect(body.message).toEqual(expect.not.stringContaining('User'))
      })
      .end(e => done(e))
  })

  it('send with empty email', (done) => {
    const dataNoUsername = {
      username: 'username_test',
      email: '',
      password: 'password',
      imageUrl: 'https://ik.imagekit.io/q8c93uv11zf/john_wick_ThFZK1ORAE5.jpg?updatedAt=1635601028767',
      gender: 'male'
    }
    request(app)
      .post('/users/register')
      .send(dataNoUsername)
      .set('Accept', 'application/json')
      .expect(400)
      .expect(({body}) => {
        expect(body.message).toEqual(expect.stringContaining('email cannot be empty'))
        expect(body.message).toEqual(expect.not.stringContaining('User'))
      })
      .end(e => done(e))
  })

  it('send with invalid email', (done) => {
    const dataNoUsername = {
      username: 'username_test',
      email: 'gdfbdrtretre',
      password: 'password',
      imageUrl: 'https://ik.imagekit.io/q8c93uv11zf/john_wick_ThFZK1ORAE5.jpg?updatedAt=1635601028767',
      gender: 'male'
    }
    request(app)
      .post('/users/register')
      .send(dataNoUsername)
      .set('Accept', 'application/json')
      .expect(400)
      .expect(({body}) => {
        expect(body.message).toEqual(expect.stringContaining('email is invalid'))
        expect(body.message).toEqual(expect.not.stringContaining('User'))
      })
      .end(e => done(e))
  })

  it('send with null password', (done) => {
    const dataNoUsername = {
      username: 'username_test',
      email: 'text@mail.com',
      imageUrl: 'https://ik.imagekit.io/q8c93uv11zf/john_wick_ThFZK1ORAE5.jpg?updatedAt=1635601028767',
      gender: 'male'
    }
    request(app)
      .post('/users/register')
      .send(dataNoUsername)
      .set('Accept', 'application/json')
      .expect(400)
      .expect(({body}) => {
        expect(body.message).toEqual(expect.stringContaining('password cannot be null'))
        expect(body.message).toEqual(expect.not.stringContaining('User'))
      })
      .end(e => done(e))
  })

  it('send with empty password', (done) => {
    const dataNoUsername = {
      username: 'username_test',
      password: '',
      email: 'text@mail.com',
      imageUrl: 'https://ik.imagekit.io/q8c93uv11zf/john_wick_ThFZK1ORAE5.jpg?updatedAt=1635601028767',
      gender: 'male'
    }
    request(app)
      .post('/users/register')
      .send(dataNoUsername)
      .set('Accept', 'application/json')
      .expect(400)
      .expect(({body}) => {
        expect(body.message).toEqual(expect.stringContaining('password cannot be empty'))
        expect(body.message).toEqual(expect.not.stringContaining('User'))
      })
      .end(e => done(e))
  })

  it('send with password less than 8 character', (done) => {
    const dataNoUsername = {
      username: 'username_test',
      password: '1234567',
      email: 'tex2t@mail.com',
      imageUrl: 'https://ik.imagekit.io/q8c93uv11zf/john_wick_ThFZK1ORAE5.jpg?updatedAt=1635601028767',
      gender: 'male'
    }
    request(app)
      .post('/users/register')
      .send(dataNoUsername)
      .set('Accept', 'application/json')
      .expect(400)
      .expect(({body}) => {
        expect(body.message).toEqual(expect.stringContaining('password length is less than 8 character'))
        expect(body.message).toEqual(expect.not.stringContaining('User'))
      })
      .end(e => done(e))
  })

  it('send with null in 3 required fields', (done) => {
    const dataNoUsername = {
      imageUrl: 'https://ik.imagekit.io/q8c93uv11zf/john_wick_ThFZK1ORAE5.jpg?updatedAt=1635601028767',
      gender: 'male'
    }
    request(app)
      .post('/users/register')
      .send(dataNoUsername)
      .set('Accept', 'application/json')
      .expect(400)
      .expect(({body}) => {
        expect(body.message).toMatch(/^(?=.*username)(?=.*email)(?=.*password)(?=.*null).*$/)
        expect(body.message).toEqual(expect.not.stringContaining('User'))
      })
      .end(e => done(e))
  })

  it('send with empty in 3 required fields', (done) => {
    const dataNoUsername = {
      password: '',
      email: '',
      username: '',
      imageUrl: 'https://ik.imagekit.io/q8c93uv11zf/john_wick_ThFZK1ORAE5.jpg?updatedAt=1635601028767',
      gender: 'male'
    }
    request(app)
      .post('/users/register')
      .send(dataNoUsername)
      .set('Accept', 'application/json')
      .expect(400)
      .expect(({body}) => {
        expect(body.message).toMatch(/^(?=.*username)(?=.*email)(?=.*password)(?=.*empty).*$/)
        expect(body.message).toEqual(expect.not.stringContaining('User'))
      })
      .end(e => done(e))
  })
})

describe('user login endpoint test', () => {
  const dataLogin = {
    email: 'test@email.com',
    password: 'password',
  }

  it('login with correct data', (done) => {
    request(app)
      .post('/users/login')
      .send(dataLogin)
      .set('Accept', 'application/json')
      .expect(200)
      .expect(({ body }) => {
        access_token = body.access_token
        expect(body.access_token).toEqual(expect.any(String))
      })
      .end(e => done(e))
  })

  it('login with wrong email', (done) => {
    const toSubmit = {...dataLogin, email: 'ngawuraja@mail.com'}
    request(app)
      .post('/users/login')
      .send(toSubmit)
      .set('Accept', 'application/json')
      .expect(401)
      .expect(({ body }) => {
        expect(body.message).toEqual('unauthorized')
      })
      .end(e => done(e))
  })

  it('login with wrong password', (done) => {
    const toSubmit = {...dataLogin, password: 'ngawuraja@mail.com'}
    request(app)
      .post('/users/login')
      .send(toSubmit)
      .set('Accept', 'application/json')
      .expect(401)
      .expect(({ body }) => {
        expect(body.message).toEqual('unauthorized')
      })
      .end(e => done(e))
  })

  it('login with null email', (done) => {
    const toSubmit = {...dataLogin}
    delete toSubmit.email
    request(app)
      .post('/users/login')
      .send(toSubmit)
      .set('Accept', 'application/json')
      .expect(400)
      .expect(({ body }) => {
        expect(body.message).toEqual('email is required')
      })
      .end(e => done(e))
  })

  it('login with empty email', (done) => {
    const toSubmit = {...dataLogin, email: ''}
    request(app)
      .post('/users/login')
      .send(toSubmit)
      .set('Accept', 'application/json')
      .expect(400)
      .expect(({ body }) => {
        expect(body.message).toEqual('email is required')
      })
      .end(e => done(e))
  })

  it('login with null password', (done) => {
    const toSubmit = {...dataLogin}
    delete toSubmit.password
    request(app)
      .post('/users/login')
      .send(toSubmit)
      .set('Accept', 'application/json')
      .expect(400)
      .expect(({ body }) => {
        expect(body.message).toEqual('password is required')
      })
      .end(e => done(e))
  })

  it('login with empty password', (done) => {
    const toSubmit = {...dataLogin, password: ''}
    request(app)
      .post('/users/login')
      .send(toSubmit)
      .set('Accept', 'application/json')
      .expect(400)
      .expect(({ body }) => {
        expect(body.message).toEqual('password is required')
      })
      .end(e => done(e))
  })
})

describe('get info user endpoint test', () => {
  it ('send with correct acceess_token', (done) => {
    request(app)
      .get('/users/login')
      .set('access_token', access_token)
      .expect(200)
      .expect(({ body }) => {
        expect(body.data).toEqual(expect.objectContaining({
          username: expect.any(String),
          email: expect.any(String),
          gender: expect.any(String),
        }))
      })
      .end(e => done(e))
  })

  it ('send with wrong access_token', (done) => {
    request(app)
      .get('/users/login')
      .set('access_token', 'jhfvusdhvungnhfeh7678rhwuihfev7n')
      .expect(401)
      .expect(({ body }) => {
        expect(body.message).toBe('unauthorized')
      })
      .end(e => done(e))
  })

  it ('send with no access_token', (done) => {
    request(app)
      .get('/users/login')
      .expect(401)
      .expect(({ body }) => {
        expect(body.message).toBe('missing token')
      })
      .end(e => done(e))
  })
})