import	React from	'react';
import './FaceRecognition.css';

/* <img alt='' src='https://rcyc.co.za/wp/wp-content/uploads/2021/05/Elon-Musk.jpg' width='500px' height ='auto'/> */
const FaceRecognition = ({imagUrl, box})=>{
	return(
			<div className='center ma'>
				<div className='absolute mt2'>
					<img id='inputimage' alt='' src={imagUrl} width='500px' height ='auto'/>
					/* <img alt='' src='https://rcyc.co.za/wp/wp-content/uploads/2021/05/Elon-Musk.jpg' width='500px' height ='auto'/> */
					<div className='bounding-box' style ={{
								top: box.topRow,
								right: box.rightCol,
								bottom: box.bottomRow,
								left: box.leftCol
								}}>
					</div>
				</div>
			</div>
		)
}


export default FaceRecognition;