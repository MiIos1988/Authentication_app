import React, { useEffect, useState } from 'react'

const NewPasswordComponent = () => {
    const [loading, setLoading] = useState(true);
    const [validToken, setValidToken] = useState(false);

    useEffect(() => {
        const { token } = useParams();
    },[token]
    )

  return (
    <div>
      work
    </div>
  )
}

export default NewPasswordComponent
