const bcrypt = require('bcrypt');
const superagent = require('superagent');

const profile = {};

profile.userProfileValidate = function(incomingProfile){
    let {userName, gender, age, ethnicity, profession, country, religous} = incomingProfile;
    let profile = Object.assign({},{userName, gender, age, profession, country, religous});
    for(var i in profile){
        if (profile[i] === undefined){
            profile[i] = null;
        }
    }
    return profile
}


profile.formatSendProfile = function(rows,authProfile){
  console.log('ROWS', rows)
  let {gender, age, ethnicity, profession, country, religous} = rows;
  let {username, picture, email} = authProfile;
  let returnedProfile = Object.assign({},{gender, age, profession, country, religous, username, email, picture});
  return returnedProfile
}

profile.getInfo = function(token){
  return superagent.get(`https://${process.env.AUTH0_DOMAIN}/userinfo`)
        .set('Authorization',`${token}`)
        .set('scope','openid profile email read write user_metadata userId')
        .then((response)=>{
          return response.body
        })
        .catch(err=> console.log('ERROEOOWEFER',err))
}


profile.sendId = function(sub, token, rows){
    return superagent.patch(`${process.env.AUTH0_AUDIENCE}users/${sub}`)
    .set('Authorization', `${token}`)
    .set('accept', 'application/json')
    .set('content-type', 'application/json')
    .set('scope', 'openid email profile userId read:clients write:clients update:users_app_metadata update:users update:current_user_metadata')
    .send(JSON.stringify({ user_metadata: rows }))
    .then(res => {
        try {
          let parsed2 = JSON.parse(res.text)
        //   expect(parsed2).toBeTruthy();
        //   console.log('this is the response from the api, stored uid', parsed2,'THIS IS THE WHOLE RESPONSE',res);
          return parsed2
        } catch (err) {
          console.log('THIS IS THE ERRORR FROM AUTH0 API METADATA!!!',err)
        }
      })
      .catch(err => {
        console.log('THIS IS THE ERRORR FROM AUTH0 API METADATA!!!',err)
      })
    }


module.exports = profile;

