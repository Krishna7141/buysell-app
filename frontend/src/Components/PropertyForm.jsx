import React from 'react'
import {useForm} from 'react-hook-form'

const PropertyForm = () => {
  const {register, handleSubmit, getValues, setValue, formState: {errors}} = useForm()

  return (
    <div>
        <p>Add/Edit Property</p>
        <label>
            <p>Name</p>
            <input
                name='name'
                type='text'
                id='name'
                required
                {...register("name")}
            />
        </label>
    </div>
  )
}

export default PropertyForm