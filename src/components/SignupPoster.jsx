import PropTypes from 'prop-types'

const SignupPoster = ({ title, subtitle }) => {
  return (
    <div className="signup-container-right">
      <div className="max-w-md text-center">
        <div className="signup-container-right-9-boxes">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className={`aspect-square rounded-2xl bg-primary/10 ${i % 2 === 0 ? "animate-pulse" : ""
              }`}
            />
          ))}
        </div>
        <h2 className="signup-container-right-title">{title}</h2>
        <p className="signup-container-right-subtitle">{subtitle}</p>
      </div>
    </div>
  )
}

SignupPoster.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string
}

export default SignupPoster