import getCountryInfo from './services/country-service';

const getCountry = async (req, res) => {
  const countryName = req.params.name;

  return await getCountryInfo(countryName)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      if (err && err.response && err.response.status === 404) {
        res.status(404).json({
          status: 404,
          message: `Country with name matching '${countryName}' not found`,
        });
      } else {
        res.status(500).send(err);
      }
    });
};

export default getCountry;
