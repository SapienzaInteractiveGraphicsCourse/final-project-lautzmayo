import * as THREE from '../build/three.module.js';

  /////////////////////////////////////////////////////////////////////////////
 /* BODY PARTS
 0: ROOT JOINT
 6: HEAD
 15: LEFTUPPERARM
 16: LEFTLOWERARM
 17: LEFTHAND
 47: RIGHTUPPERARM
 48: RIGHTLOWERARM
 49: RIGHTHAND
 81: LEFTUPPERLEG
 82: LEFTLOWERLEG
 83: LEFTFEET
 76: RIGHTUPPERLEG
 77: RIGHTLOWERLEG
 78: RIGHTFEET
 */
  /////////////////////////////////////////////////////////////////////////////
  
//CONTACT 
      var q1ual = new THREE.Quaternion(0.457406,0.275954,0.151831,0.831611);
      var q1lal = new THREE.Quaternion(0.165123,0.041059,0.085985,0.981659);
      var q1hl = new THREE.Quaternion(-0.107497,0.03446,0.059782,0.991808);
      var q1uar = new THREE.Quaternion(-0.388877,0.182269,0.129834,0.893698);
      var q1lar = new THREE.Quaternion(-0.035066,0.008719,0.01826,0.99918);
      var q1hr = new THREE.Quaternion(-0.250341,-0.080252,-0.139221,0.954728);
      var q1ull = new THREE.Quaternion(0,0,0,1);
      var q1lll = new THREE.Quaternion(-0.365711,-0.049149,-0.031574,0.928893);
      var q1fl = new THREE.Quaternion(0,0,0,1);
      var q1ulr = new THREE.Quaternion(0.186979,-0.373235,-0.463498,0.781604);
      var q1llr = new THREE.Quaternion(-0.188886,0.025385,0.016308,0.981535);
      var q1fr = new THREE.Quaternion(-0.006642,-0.009391,-0.02047,0.999724);
     
//RECOIL 
        
        var q2ual = new THREE.Quaternion(0.196908,0.118795,0.065361,0.971001);
        var q2lal = new THREE.Quaternion(0.155876,0.03876,0.08117,0.983673);
        var q2hl = new THREE.Quaternion(0,0,0,1);
        var q2uar = new THREE.Quaternion(-0.368007,0.222019,0.122156,0.894626);
        var q2lar = new THREE.Quaternion(0.10595,-0.026345,-0.055172,0.99249);
        var q2hr = new THREE.Quaternion(-0.118515,-0.037992,-0.065909,0.990034);
        var q2ull = new THREE.Quaternion(0,0,0,1);
        var q2lll = new THREE.Quaternion(0.028529,0.003834,0.002463,0.999583);
        var q2fl = new THREE.Quaternion(0,0,0,1);
        var q2ulr = new THREE.Quaternion(0.186979,-0.373235,-0.463498,0.781604);
        var q2llr = new THREE.Quaternion(0.114573,-0.015398,-0.009892,0.993246);
        var q2fr = new THREE.Quaternion(-0.006642,-0.009391,-0.02047,0.999724);

//PASSING 
        
        var q3ual = new THREE.Quaternion(-0.108837,-0.065661,-0.036127,0.991231);
        var q3lal = new THREE.Quaternion(0.155876,0.03876,0.08117,0.983673);
        var q3hl = new THREE.Quaternion(0,0,0,1);
        var q3uar = new THREE.Quaternion(-0.011362,0.006855,0.003771,0.999905);
        var q3lar = new THREE.Quaternion(0.10595,-0.026345,-0.055172,0.99249);
        var q3hr = new THREE.Quaternion(-0.118515,-0.037992,-0.065909,0.990034);
        var q3ull = new THREE.Quaternion(0.10355,0.206699,0.256687,0.938438);
        var q3lll = new THREE.Quaternion(-0.353107,-0.047455,-0.030486,0.933881);
        var q3fl = new THREE.Quaternion(0,0,0,1);
        var q3ulr = new THREE.Quaternion(-0.06278,0.125318,0.155625,0.977822);
        var q3llr = new THREE.Quaternion(0.511405,-0.068729,-0.044153,0.855448);
        var q3fr = new THREE.Quaternion(-0.006642,-0.009391,-0.02047,0.999724);

//HIGH POINT 
        
        var q4ual = new THREE.Quaternion(-0.050092,-0.030221,-0.016627,0.998149);
        var q4lal = new THREE.Quaternion(-0.107195,-0.026655,-0.05582,0.992312);
        var q4hl = new THREE.Quaternion(-0.219264,0.070289,0.121938,0.96546);
        var q4uar = new THREE.Quaternion(0.257638,-0.155434,-0.08552,0.949815);
        var q4lar = new THREE.Quaternion(0.10595,-0.026345,-0.055172,0.99249);
        var q4hr = new THREE.Quaternion(-0.118515,-0.037992,-0.065909,0.990034);
        var q4ull = new THREE.Quaternion(0.222628,0.444395,0.551868,0.66962);
        var q4lll = new THREE.Quaternion(-0.583393,-0.078404,-0.050368,0.806827);
        var q4fl = new THREE.Quaternion(-0.010195,0.014414,0.03142,0.99935);
        var q4ulr = new THREE.Quaternion(-0.110366,0.220306,0.273585,0.929751);
        var q4llr = new THREE.Quaternion(0.511405,-0.068729,-0.044153,0.855448);
        var q4fr = new THREE.Quaternion(-0.006642,-0.009391,-0.02047,0.999724);

//CONTACT MIRROR 

        var q5ual = new THREE.Quaternion(-0.388877,-0.182269,-0.129834,0.893698);
        var q5lal = new THREE.Quaternion(-0.035066,-0.008719,-0.01826,0.99918);
        var q5hl = new THREE.Quaternion(-0.250341,0.080252,0.139221,0.954728);
        var q5uar = new THREE.Quaternion(0.457406,-0.275954,-0.151831,0.831611);
        var q5lar = new THREE.Quaternion(0.165123,-0.041059,-0.085985,0.981659);
        var q5hr = new THREE.Quaternion(-0.107497,-0.03446,-0.059782,0.991808);
        var q5ull = new THREE.Quaternion(0.186979,0.373235,0.463498,0.781604);
        var q5lll = new THREE.Quaternion(-0.188886,-0.025385,-0.016308,0.981535);
        var q5fl = new THREE.Quaternion(-0.006642,0.009391,0.02047,0.999724);
        var q5ulr = new THREE.Quaternion(0,0,0,1);
        var q5llr = new THREE.Quaternion(-0.365711,0.049149,0.031574,0.928893);
        var q5fr = new THREE.Quaternion(0,0,0,1);

//RECOIL MIRROR 
        
        var q6uar = new THREE.Quaternion(0.196908,0.118795,0.065361,0.971001);
        var q6lar = new THREE.Quaternion(0.155876,0.03876,0.08117,0.983673);
        var q6hr = new THREE.Quaternion(0,0,0,1);
        var q6ual = new THREE.Quaternion(-0.368007,0.222019,0.122156,0.894626);
        var q6lal = new THREE.Quaternion(0.10595,-0.026345,-0.055172,0.99249);
        var q6hl = new THREE.Quaternion(-0.118515,-0.037992,-0.065909,0.990034);
        var q6ulr = new THREE.Quaternion(0,0,0,1);
        var q6llr = new THREE.Quaternion(0.028529,0.003834,0.002463,0.999583);
        var q6fr = new THREE.Quaternion(0,0,0,1);
        var q6ull = new THREE.Quaternion(0.186979,-0.373235,-0.463498,0.781604);
        var q6lll = new THREE.Quaternion(0.114573,-0.015398,-0.009892,0.993246);
        var q6fl = new THREE.Quaternion(-0.006642,-0.009391,-0.02047,0.999724);

//PASSING MIRROR 
        
        var q7uar = new THREE.Quaternion(-0.108837,-0.065661,-0.036127,0.991231);
        var q7lar = new THREE.Quaternion(0.155876,0.03876,0.08117,0.983673);
        var q7hr = new THREE.Quaternion(0,0,0,1);
        var q7ual = new THREE.Quaternion(-0.011362,0.006855,0.003771,0.999905);
        var q7lal = new THREE.Quaternion(0.10595,-0.026345,-0.055172,0.99249);
        var q7hl = new THREE.Quaternion(-0.118515,-0.037992,-0.065909,0.990034);
        var q7ulr = new THREE.Quaternion(0.10355,0.206699,0.256687,0.938438);
        var q7llr = new THREE.Quaternion(-0.353107,-0.047455,-0.030486,0.933881);
        var q7fr = new THREE.Quaternion(0,0,0,1);
        var q7ull = new THREE.Quaternion(-0.06278,0.125318,0.155625,0.977822);
        var q7lll = new THREE.Quaternion(0.511405,-0.068729,-0.044153,0.855448);
        var q7fl = new THREE.Quaternion(-0.006642,-0.009391,-0.02047,0.999724);

//HIGH POINT MIRROR

        var q8uar = new THREE.Quaternion(-0.050092,-0.030221,-0.016627,0.998149);
        var q8lar = new THREE.Quaternion(-0.107195,-0.026655,-0.05582,0.992312);
        var q8hr = new THREE.Quaternion(-0.219264,0.070289,0.121938,0.96546);
        var q8ual = new THREE.Quaternion(0.257638,-0.155434,-0.08552,0.949815);
        var q8lal = new THREE.Quaternion(0.10595,-0.026345,-0.055172,0.99249);
        var q8hl = new THREE.Quaternion(-0.118515,-0.037992,-0.065909,0.990034);
        var q8ulr = new THREE.Quaternion(0.222628,0.444395,0.551868,0.66962);
        var q8llr = new THREE.Quaternion(-0.583393,-0.078404,-0.050368,0.806827);
        var q8fr = new THREE.Quaternion(-0.010195,0.014414,0.03142,0.99935);
        var q8ull = new THREE.Quaternion(-0.110366,0.220306,0.273585,0.929751);
        var q8lll = new THREE.Quaternion(0.511405,-0.068729,-0.044153,0.855448);
        var q8fl = new THREE.Quaternion(-0.006642,-0.009391,-0.02047,0.999724);

export function getAnimation(player,skeleton){ 

var KFuar = new THREE.QuaternionKeyframeTrack( skeleton.bones[47].name+'.quaternion', [ 0, 1, 2, 3, 4, 5, 6, 7], [q1uar.x,q1uar.y,q1uar.z,q1uar.w,q2uar.x,q2uar.y,q2uar.z,q2uar.w,q3uar.x,q3uar.y,q3uar.z,q3uar.w,q4uar.x,q4uar.y,q4uar.z,q4uar.w,q5uar.x,q5uar.y,q5uar.z,q5uar.w,q6uar.x,q6uar.y,q6uar.z,q6uar.w,q7uar.x,q7uar.y,q7uar.z,q7uar.w,q8uar.x,q8uar.y,q8uar.z,q8uar.w] );
var KFlar = new THREE.QuaternionKeyframeTrack( skeleton.bones[48].name+'.quaternion', [ 0, 1, 2, 3, 4, 5, 6, 7], [q1lar.x,q1lar.y,q1lar.z,q1lar.w,q2lar.x,q2lar.y,q2lar.z,q2lar.w,q3lar.x,q3lar.y,q3lar.z,q3lar.w,q4lar.x,q4lar.y,q4lar.z,q4lar.w,q5lar.x,q5lar.y,q5lar.z,q5lar.w,q6lar.x,q6lar.y,q6lar.z,q6lar.w,q7lar.x,q7lar.y,q7lar.z,q7lar.w,q8lar.x,q8lar.y,q8lar.z,q8lar.w] );
var KFhr = new THREE.QuaternionKeyframeTrack( skeleton.bones[49].name+'.quaternion', [ 0, 1, 2, 3, 4, 5, 6, 7], [q1hr.x,q1hr.y,q1hr.z,q1hr.w,q2hr.x,q2hr.y,q2hr.z,q2hr.w,q3hr.x,q3hr.y,q3hr.z,q3hr.w,q4hr.x,q4hr.y,q4hr.z,q4hr.w,q5hr.x,q5hr.y,q5hr.z,q5hr.w,q6hr.x,q6hr.y,q6hr.z,q6hr.w,q7hr.x,q7hr.y,q7hr.z,q7hr.w,q8hr.x,q8hr.y,q8hr.z,q8hr.w] );
var KFual = new THREE.QuaternionKeyframeTrack( skeleton.bones[15].name+'.quaternion', [ 0, 1, 2, 3, 4, 5, 6, 7], [q1ual.x,q1ual.y,q1ual.z,q1ual.w,q2ual.x,q2ual.y,q2ual.z,q2ual.w,q3ual.x,q3ual.y,q3ual.z,q3ual.w,q4ual.x,q4ual.y,q4ual.z,q4ual.w,q5ual.x,q5ual.y,q5ual.z,q5ual.w,q6ual.x,q6ual.y,q6ual.z,q6ual.w,q7ual.x,q7ual.y,q7ual.z,q7ual.w,q8ual.x,q8ual.y,q8ual.z,q8ual.w] );
var KFlal = new THREE.QuaternionKeyframeTrack( skeleton.bones[16].name+'.quaternion', [ 0, 1, 2, 3, 4, 5, 6, 7], [q1lal.x,q1lal.y,q1lal.z,q1lal.w,q2lal.x,q2lal.y,q2lal.z,q2lal.w,q3lal.x,q3lal.y,q3lal.z,q3lal.w,q4lal.x,q4lal.y,q4lal.z,q4lal.w,q5lal.x,q5lal.y,q5lal.z,q5lal.w,q6lal.x,q6lal.y,q6lal.z,q6lal.w,q7lal.x,q7lal.y,q7lal.z,q7lal.w,q8lal.x,q8lal.y,q8lal.z,q8lal.w] );
var KFhl = new THREE.QuaternionKeyframeTrack( skeleton.bones[17].name+'.quaternion', [ 0, 1, 2, 3, 4, 5, 6, 7], [q1hl.x,q1hl.y,q1hl.z,q1hl.w,q2hl.x,q2hl.y,q2hl.z,q2hl.w,q3hl.x,q3hl.y,q3hl.z,q3hl.w,q4hl.x,q4hl.y,q4hl.z,q4hl.w,q5hl.x,q5hl.y,q5hl.z,q5hl.w,q6hl.x,q6hl.y,q6hl.z,q6hl.w,q7hl.x,q7hl.y,q7hl.z,q7hl.w,q8hl.x,q8hl.y,q8hl.z,q8hl.w] );
var KFulr = new THREE.QuaternionKeyframeTrack( skeleton.bones[76].name+'.quaternion', [ 0, 1, 2, 3, 4, 5, 6, 7], [q1ulr.x,q1ulr.y,q1ulr.z,q1ulr.w,q2ulr.x,q2ulr.y,q2ulr.z,q2ulr.w,q3ulr.x,q3ulr.y,q3ulr.z,q3ulr.w,q4ulr.x,q4ulr.y,q4ulr.z,q4ulr.w,q5ulr.x,q5ulr.y,q5ulr.z,q5ulr.w,q6ulr.x,q6ulr.y,q6ulr.z,q6ulr.w,q7ulr.x,q7ulr.y,q7ulr.z,q7ulr.w,q8ulr.x,q8ulr.y,q8ulr.z,q8ulr.w] );
var KFllr = new THREE.QuaternionKeyframeTrack( skeleton.bones[77].name+'.quaternion', [ 0, 1, 2, 3, 4, 5, 6, 7], [q1llr.x,q1llr.y,q1llr.z,q1llr.w,q2llr.x,q2llr.y,q2llr.z,q2llr.w,q3llr.x,q3llr.y,q3llr.z,q3llr.w,q4llr.x,q4llr.y,q4llr.z,q4llr.w,q5llr.x,q5llr.y,q5llr.z,q5llr.w,q6llr.x,q6llr.y,q6llr.z,q6llr.w,q7llr.x,q7llr.y,q7llr.z,q7llr.w,q8llr.x,q8llr.y,q8llr.z,q8llr.w] );
var KFfr = new THREE.QuaternionKeyframeTrack( skeleton.bones[78].name+'.quaternion', [ 0, 1, 2, 3, 4, 5, 6, 7], [q1fr.x,q1fr.y,q1fr.z,q1fr.w,q2fr.x,q2fr.y,q2fr.z,q2fr.w,q3fr.x,q3fr.y,q3fr.z,q3fr.w,q4fr.x,q4fr.y,q4fr.z,q4fr.w,q5fr.x,q5fr.y,q5fr.z,q5fr.w,q6fr.x,q6fr.y,q6fr.z,q6fr.w,q7fr.x,q7fr.y,q7fr.z,q7fr.w,q8fr.x,q8fr.y,q8fr.z,q8fr.w] );
var KFull = new THREE.QuaternionKeyframeTrack( skeleton.bones[81].name+'.quaternion', [ 0, 1, 2, 3, 4, 5, 6, 7], [q1ull.x,q1ull.y,q1ull.z,q1ull.w,q2ull.x,q2ull.y,q2ull.z,q2ull.w,q3ull.x,q3ull.y,q3ull.z,q3ull.w,q4ull.x,q4ull.y,q4ull.z,q4ull.w,q5ull.x,q5ull.y,q5ull.z,q5ull.w,q6ull.x,q6ull.y,q6ull.z,q6ull.w,q7ull.x,q7ull.y,q7ull.z,q7ull.w,q8ull.x,q8ull.y,q8ull.z,q8ull.w] );
var KFlll = new THREE.QuaternionKeyframeTrack( skeleton.bones[82].name+'.quaternion', [ 0, 1, 2, 3, 4, 5, 6, 7], [q1lll.x,q1lll.y,q1lll.z,q1lll.w,q2lll.x,q2lll.y,q2lll.z,q2lll.w,q3lll.x,q3lll.y,q3lll.z,q3lll.w,q4lll.x,q4lll.y,q4lll.z,q4lll.w,q5lll.x,q5lll.y,q5lll.z,q5lll.w,q6lll.x,q6lll.y,q6lll.z,q6lll.w,q7lll.x,q7lll.y,q7lll.z,q7lll.w,q8lll.x,q8lll.y,q8lll.z,q8lll.w] );
var KFfl = new THREE.QuaternionKeyframeTrack( skeleton.bones[83].name+'.quaternion', [ 0, 1, 2, 3, 4, 5, 6, 7], [q1fl.x,q1fl.y,q1fl.z,q1fl.w,q2fl.x,q2fl.y,q2fl.z,q2fl.w,q3fl.x,q3fl.y,q3fl.z,q3fl.w,q4fl.x,q4fl.y,q4fl.z,q4fl.w,q5fl.x,q5fl.y,q5fl.z,q5fl.w,q6fl.x,q6fl.y,q6fl.z,q6fl.w,q7fl.x,q7fl.y,q7fl.z,q7fl.w,q8fl.x,q8fl.y,q8fl.z,q8fl.w] );

var clip = new THREE.AnimationClip( 'Walk', 3, [ KFual,KFlal,KFhl,KFuar,KFlar,KFhr,KFull,KFlll,KFfl,KFulr,KFllr,KFfr] );
var mixer = new THREE.AnimationMixer(player.children[0]);
var AnimationAction = mixer.clipAction(clip);
AnimationAction.clampWhenFinished=true;
var clock = new THREE.Clock();
return [mixer,AnimationAction,clock];
}            