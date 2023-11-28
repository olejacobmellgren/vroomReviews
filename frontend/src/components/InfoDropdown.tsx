type InfoDropdownProps = {
  showInfo: boolean;
  toogleShowInfo: () => void;
  formattedPrice: string;
  carDrivetrain: string;
  carBody: string;
  carHorsepower: number;
  carNumOfDoors: number;
  carEngineType: string;
};

function infoDropdown({
  showInfo,
  toogleShowInfo,
  formattedPrice,
  carDrivetrain,
  carBody,
  carHorsepower,
  carNumOfDoors,
  carEngineType,
  }: InfoDropdownProps) {
  return (
    <div className="info-section">
      <div
        className="info-wrapper"
        style={showInfo ? { height: '25rem' } : { height: '0' }}
      >
        <div className="info-line"></div>
        <div className="info">
          <table>
            <tbody>
              <tr>
                <td>Price</td>
                <td>{formattedPrice}</td>
              </tr>
              <tr>
                <td>Drivetrain</td>
                <td>{carDrivetrain}</td>
              </tr>
              <tr>
                <td>Type</td>
                <td>{carBody}</td>
              </tr>
              <tr>
                <td>Horsepower</td>
                <td>{carHorsepower}</td>
              </tr>
              <tr>
                <td>Number of doors</td>
                <td>{carNumOfDoors}</td>
              </tr>
              <tr>
                <td>Type of engine</td>
                <td>{carEngineType}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="info-line">
        <button
          className="info-button"
          onClick={() => toogleShowInfo()}
          aria-label="show more info"
        >
          <i
            className={
              showInfo ? 'arrow-info-button open' : 'arrow-info-button closed'
            }
          />
        </button>
      </div>
    </div>
  )
}

export default infoDropdown;