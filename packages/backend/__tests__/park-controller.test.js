const mockFindAll = jest.fn();
const mockFindByPk = jest.fn();
const mockDestroy = jest.fn();
const mockUpdate = jest.fn();

jest.mock('../src/models', () => ({
  ParkingSpots: {
    findAll: mockFindAll,
    findByPk: mockFindByPk,
    destroy: mockDestroy,
    update: mockUpdate
  },
  Sequelize: {
    Op: {
      iLike: Symbol('iLike')
    }
  }
}));

const {
  findAll,
  findOne,
  deleteOne,
  updateSpot,
  locTtc
} = require('../src/controller/park-controller');

const buildRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

beforeEach(() => {
  jest.clearAllMocks();
});

// ─── findAll ─────────────────────────────────────────────────────────────────

describe('findAll', () => {
  it('should return all parking spots when no address filter is provided', async () => {
    const spots = [{ id: 1, address: '123 Main St' }];
    mockFindAll.mockResolvedValue(spots);

    const req = { query: {} };
    const res = buildRes();

    await findAll(req, res);

    expect(mockFindAll).toHaveBeenCalledWith({ where: {} });
    expect(res.send).toHaveBeenCalledWith(spots);
  });

  it('should filter parking spots by address when address query param is provided', async () => {
    const spots = [{ id: 2, address: '456 Elm St' }];
    mockFindAll.mockResolvedValue(spots);

    const req = { query: { address: 'Elm' } };
    const res = buildRes();

    await findAll(req, res);

    expect(mockFindAll).toHaveBeenCalledWith({
      where: { address: expect.anything() }
    });
    expect(res.send).toHaveBeenCalledWith(spots);
  });

  it('should return 500 when an error occurs', async () => {
    mockFindAll.mockRejectedValue(new Error('DB error'));

    const req = { query: {} };
    const res = buildRes();

    await findAll(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith(
      expect.objectContaining({ message: expect.any(String) })
    );
  });
});

// ─── findOne ─────────────────────────────────────────────────────────────────

describe('findOne', () => {
  it('should return a parking spot when it exists', async () => {
    const spot = { id: 1, address: '123 Main St' };
    mockFindByPk.mockResolvedValue(spot);

    const req = { params: { id: '1' } };
    const res = buildRes();

    await findOne(req, res);

    expect(mockFindByPk).toHaveBeenCalledWith('1');
    expect(res.send).toHaveBeenCalledWith(spot);
  });

  it('should return 404 when parking spot does not exist', async () => {
    mockFindByPk.mockResolvedValue(null);

    const req = { params: { id: '99' } };
    const res = buildRes();

    await findOne(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.send).toHaveBeenCalledWith(
      expect.objectContaining({ message: expect.stringContaining('99') })
    );
  });

  it('should return 500 when an error occurs', async () => {
    mockFindByPk.mockRejectedValue(new Error('DB error'));

    const req = { params: { id: '1' } };
    const res = buildRes();

    await findOne(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith(
      expect.objectContaining({ message: expect.any(String) })
    );
  });
});

// ─── deleteOne ───────────────────────────────────────────────────────────────

describe('deleteOne', () => {
  it('should delete a parking spot successfully when it exists', async () => {
    mockDestroy.mockResolvedValue(1);

    const req = { params: { id: '1' } };
    const res = buildRes();

    await deleteOne(req, res);

    expect(mockDestroy).toHaveBeenCalledWith({ where: { id: '1' } });
    expect(res.send).toHaveBeenCalledWith({
      message: 'Parking spot was deleted successfully!'
    });
  });

  it('should send not-found message when parking spot does not exist', async () => {
    mockDestroy.mockResolvedValue(0);

    const req = { params: { id: '99' } };
    const res = buildRes();

    await deleteOne(req, res);

    expect(res.send).toHaveBeenCalledWith(
      expect.objectContaining({ message: expect.stringContaining('99') })
    );
  });

  it('should return 500 when an error occurs', async () => {
    mockDestroy.mockRejectedValue(new Error('DB error'));

    const req = { params: { id: '1' } };
    const res = buildRes();

    await deleteOne(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith(
      expect.objectContaining({ message: expect.any(String) })
    );
  });
});

// ─── updateSpot ──────────────────────────────────────────────────────────────

describe('updateSpot', () => {
  it('should update a parking spot successfully when it exists', async () => {
    mockUpdate.mockResolvedValue([1]);

    const req = { params: { id: '1' }, body: { address: '789 Oak Ave' } };
    const res = buildRes();

    await updateSpot(req, res);

    expect(mockUpdate).toHaveBeenCalledWith(
      { address: '789 Oak Ave' },
      { where: { id: '1' } }
    );
    expect(res.send).toHaveBeenCalledWith(
      expect.objectContaining({ message: expect.stringContaining('updated successfully') })
    );
  });

  it('should send not-found message when parking spot does not exist', async () => {
    mockUpdate.mockResolvedValue([0]);

    const req = { params: { id: '99' }, body: { address: 'New Address' } };
    const res = buildRes();

    await updateSpot(req, res);

    expect(res.send).toHaveBeenCalledWith(
      expect.objectContaining({ message: expect.stringContaining('99') })
    );
  });

  it('should return 500 when an error occurs', async () => {
    mockUpdate.mockRejectedValue(new Error('DB error'));

    const req = { params: { id: '1' }, body: {} };
    const res = buildRes();

    await updateSpot(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith(
      expect.objectContaining({ message: expect.any(String) })
    );
  });
});

// ─── locTtc ──────────────────────────────────────────────────────────────────

describe('locTtc', () => {
  it('should return all TTC parking spots', async () => {
    const ttcSpots = [
      { id: 1, address: '100 TTC Rd', is_ttc: true },
      { id: 2, address: '200 Transit Blvd', is_ttc: true }
    ];
    mockFindAll.mockResolvedValue(ttcSpots);

    const req = {};
    const res = buildRes();

    await locTtc(req, res);

    expect(mockFindAll).toHaveBeenCalledWith({ where: { is_ttc: true } });
    expect(res.send).toHaveBeenCalledWith(ttcSpots);
  });

  it('should return 500 when an error occurs', async () => {
    mockFindAll.mockRejectedValue(new Error('DB error'));

    const req = {};
    const res = buildRes();

    await locTtc(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith(
      expect.objectContaining({ message: expect.any(String) })
    );
  });
});
