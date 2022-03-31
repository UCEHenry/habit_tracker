const userController = require('../../../controllers/controller')
const User = require('../../../models/model');

const mockSend = jest.fn();
const mockJson = jest.fn();
const mockStatus = jest.fn(code => ({ send: mockSend, json: mockJson, end: jest.fn() }))
const mockRes = { status: mockStatus }

describe('user controller', () => {
    beforeEach(() =>  jest.clearAllMocks());

    afterAll(() => jest.resetAllMocks());

    describe('getAll', () => {
        test('it returns users with a 200 status code', async () => {
            let testUsers = ['d1', 'd2']
            jest.spyOn(User,'all','get')
                 .mockResolvedValue(testUsers);
            await userController.getAll(null, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(200);
            expect(mockJson).toHaveBeenCalledWith(testUsers);
        })
    });

    describe('createNewUser', () => {
        test('it creates a new user with a 201 status code', async () => {
            let testUser = {
                username: 'Geoffrey', password: 'password'
            }
            jest.spyOn(User, 'createUser')
                .mockResolvedValue(new User(testUser));   
            const mockReq = { body: { username: 'Geoffrey' , password: 'password'} }
            await userController.createNewUser(mockReq, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(201);
            expect(mockJson).toHaveBeenCalledWith(new User(testUser));
        })
    });

    describe('getUser', () => {
        test('it returns a user with a 200 status code', async () => {
            let testUser = {
                username: 'Vivian', password: 'Banks'
            }
            jest.spyOn(User, 'findByUsername')
                .mockResolvedValue(new User(testUser));   
            const mockReq = { params: {username: 'Vivian'} }
            await userController.getUser(mockReq, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(200);
            expect(mockJson).toHaveBeenCalledWith(new User(testUser));
        })
    });

    describe('updateUser', () => {
        test('it returns a 200 status code', async () => {
            let testUser = {
                username: 'Vivian', password: 'Banks'
            }
            jest.spyOn(User, 'updateAUser')
                .mockResolvedValue(new User(testUser)); 
            const mockReq = { params: { oldUsername: 'Vivian' , newUsername: 'Banks'} }
            await userController.updateUser(mockReq, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(200);
            expect(mockJson).toHaveBeenCalledWith(new User(testUser));
        })
    });

    describe('removeUser', () => {
        test('it returns a 204 status code', async () => {
            jest.spyOn(User.prototype, 'RemoveAUser')
                .mockResolvedValue('Deleted');
            
            const mockReq = { params: { username:'phil' } }
            await userController.removeUser(mockReq, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(204);
        })
    });

    describe('createHabit', () => {
        test('it creates a new habit with a 201 status code', async () => {
            let testUser = {
                username: 'Geoffrey', password: 'password'
            }
            let testHabit = { habitName: "flying", schedule: 'monthly', completed: 'true', dates: [], currentStreak: 0, longestStreak: 0 }
            jest.spyOn(User, 'createHabit')
                .mockResolvedValue(new User(testUser));   
            const mockReq = { body: { username: 'Geoffrey' , password: 'password', habit: testHabit} }
            await userController.createHabit(mockReq, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(201);
            expect(mockJson).toHaveBeenCalledWith(new User(testUser));
        })
    });

    describe('updateHabit', () => {
        test('it returns a 201 status code', async () => {
            let testUser = {
                username: 'Vivian', password: 'Banks', habit: { habitName: "flying", schedule: 'monthly', completed: 'true', dates: [], currentStreak: 0, longestStreak: 0 }
            }
            jest.spyOn(User, 'updateAHabit')
                .mockResolvedValue(new User(testUser)); 
            const mockReq = { body: { username: 'Vivian' , habit: { habitName: "eating", schedule: 'daily', completed: 'true', dates: [], currentStreak: 0, longestStreak: 0 }} }
            await userController.updateHabit(mockReq, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(201);
            expect(mockJson).toHaveBeenCalledWith('updated habit');
        })
    });

    describe('remove a habit', () => {
        test('it returns a 204 status code', async () => {
            const mockReq = { params: { username:'phil' , habitname: 'sleep'} }
            await userController.remove(mockReq, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(204);
        })
    });
    
})