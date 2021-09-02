import * as THREE from "../build/three.module.js"

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
//l'animazione si basa su keyframe, in ognuno di questi vanno definite l'orientazione dei singoli bones in termini di quaternions
//qui sono stati definiti solo per la camminata in realtà
//CONTACT
var q1ual = new THREE.Quaternion(0.5869630470760588, 0.7213944155389754, 0.3578294246896947, 0.08380084380607711)
var q1lal = new THREE.Quaternion(0.07185520084097083, -0.8910399791422927, 0.07185520084097086, 0.44240413175546867)
var q1hl = new THREE.Quaternion(-0.015221020701376273, 0.014771105070617888, -0.015221020701376273, 0.9996591696736489)
var q1uar = new THREE.Quaternion(0.42332920248377776, -0.5126260803711451, 0.4564573770327286, 0.5913151029697842)
var q1lar = new THREE.Quaternion(0.13310049798609588, -0.025192615123015204, -0.11391756145872693, 0.9842115518375173)
var q1hr = new THREE.Quaternion(0.002200532404294261, 0.0714838544048463, -0.17753888518908242, 0.9815116710780276)
var q1ull = new THREE.Quaternion(-0.23147937718537176, -0.10211084034769319, 0.9671385397167249, 0.025173780327181237)
var q1lll = new THREE.Quaternion(-0.08737008378889076, -0.06779019758454978, -0.028943214530114905, 0.9934451408622591)
var q1fl = new THREE.Quaternion(0.44996899366378784, -0.14811140298843384, 0.07595845311880112, 0.8773945569992065)
var q1ulr = new THREE.Quaternion(0.03894492329065115, -0.20832423309640563, -0.9772416461387776, 0.00911437911499868)
var q1llr = new THREE.Quaternion(-0.08290691615014453, -0.23529667613980204, -0.016645681672926724, 0.9682380072759371)
var q1fr = new THREE.Quaternion(0.3631595350238158, 0.23092954634656862, -0.01252752430023503, 0.9025684228247524)

//RECOIL
var q2ual = new THREE.Quaternion(0.6394699654575977, 0.7142419437033167, 0.2311589685027231, 0.16583769298119178)
var q2lal = new THREE.Quaternion(0.03765920845210857, -0.6835313589908804, 0.2645792279673935, 0.6792381742975131)
var q2hl = new THREE.Quaternion(-0.015221020701376273, 0.014771105070617888, -0.015221020701376273, 0.9996591696736489)
var q2uar = new THREE.Quaternion(0.3753743727967995, -0.6368660633194375, 0.4047573309741005, 0.5382073955847633)
var q2lar = new THREE.Quaternion(0.15664227380771034, -0.028624016850860245, -0.07520750190552306, 0.9843717262156623)
var q2hr = new THREE.Quaternion(0.002200532404294261, 0.0714838544048463, -0.17753888518908242, 0.9815116710780276)
var q2ull = new THREE.Quaternion(-0.2763702322082246, -0.13070483350533985, 0.9518034668878145, 0.02461506993389496)
var q2lll = new THREE.Quaternion(-0.2115326810185591, -0.1322573529489628, -0.15159376751260875, 0.9564419726796641)
var q2fl = new THREE.Quaternion(0.44996899366378784, -0.14811140298843384, 0.07595845311880112, 0.8773945569992065)
var q2ulr = new THREE.Quaternion(0.005274916744721032, -0.30100730025020617, -0.9535035334070271, -0.014063862546712713)
var q2llr = new THREE.Quaternion(-0.2689477605674201, -0.23406263183956494, 0.02926241441049575, 0.9338230547405512)
var q2fr = new THREE.Quaternion(0.3631595350238158, 0.23092954634656862, -0.01252752430023503, 0.9025684228247524)

//PASSING
var q3ual = new THREE.Quaternion(0.5529645691568934, 0.8248905766840529, 0.02901171090803259, 0.11377188749937653)
var q3lal = new THREE.Quaternion(-0.16533507219470586, -0.6352942496025078, 0.4324233855417958, 0.6181225978403713)
var q3hl = new THREE.Quaternion(-0.015221020701376273, 0.014771105070617888, -0.015221020701376273, 0.9996591696736489)
var q3uar = new THREE.Quaternion(0.44139360004595163, -0.5091478839249589, 0.31114265446351436, 0.6701718963867475)
var q3lar = new THREE.Quaternion(0.1823957476147261, 0.016733674712433734, 0.1296657492213404, 0.9744940065806212)
var q3hr = new THREE.Quaternion(0.002200532404294261, 0.0714838544048463, -0.17753888518908242, 0.9815116710780276)
var q3ull = new THREE.Quaternion(0.28423806256769163, -0.3540501211902194, -0.8730605511976339, 0.17782718975297196)
var q3lll = new THREE.Quaternion(-0.5114285637201612, -0.08377111277987938, -0.3148836055713837, 0.7951550413706243)
var q3fl = new THREE.Quaternion(0.26501374123473814, -0.21882714558716337, 0.006086297982159337, 0.9390662140061339)
var q3ulr = new THREE.Quaternion(0.003183424911378919, -0.09560014037406425, -0.9951055773204255, -0.024806631211745665)
var q3llr = new THREE.Quaternion(-0.11776906202348474, -0.23281892838047658, 0.014553017219205079, 0.9652533368539539)
var q3fr = new THREE.Quaternion(0.40972200941475606, 0.3115929687876847, -0.14500836007325663, 0.8449912853468232)

//HIGH POINT
var q4ual = new THREE.Quaternion(0.5529645691568934, 0.8248905766840529, 0.02901171090803259, 0.11377188749937653)
var q4lal = new THREE.Quaternion(0.03423874596338661, -0.6065470467518221, 0.19329317038856367, 0.7704324361244375)
var q4hl = new THREE.Quaternion(-0.015221020701376273, 0.014771105070617888, -0.015221020701376273, 0.9996591696736489)
var q4uar = new THREE.Quaternion(0.4296595741313532, -0.508828135541564, 0.26587789630663927, 0.6969903321381982)
var q4lar = new THREE.Quaternion(0.28421454106092425, -0.034335982194803966, 0.06273614675889583, 0.9560895935350895)
var q4hr = new THREE.Quaternion(0.002200532404294261, 0.0714838544048463, -0.17753888518908242, 0.9815116710780276)
var q4ull = new THREE.Quaternion(-0.3077215032490353, 0.39206195653237086, 0.8555173526372929, -0.14030309338942307)
var q4lll = new THREE.Quaternion(-0.37432440567779696, -0.12741519565704199, -0.19851189494957983, 0.8967940871756286)
var q4fl = new THREE.Quaternion(0.26501374123473814, -0.21882714558716337, 0.006086297982159337, 0.9390662140061339)
var q4ulr = new THREE.Quaternion(0.0399891534180775, -0.03992551521268978, 0.9984018100335328, -0.0008040930742684838)
var q4llr = new THREE.Quaternion(-0.08440045080516127, -0.21106387822451278, -0.019176351429515986, 0.9736328213236063)
var q4fr = new THREE.Quaternion(0.48924044209318857, 0.24153165167072246, -0.15385128260905304, 0.823793684062474)

//CONTACT MIRROR
var q5uar = new THREE.Quaternion(0.48909044286008907, -0.22822628779445547, 0.38097110461315475, 0.7507092098224966)
var q5lar = new THREE.Quaternion(0.13180498587936915, -0.33968472196461347, -0.014987254575721282, 0.9311375395511906)
var q5hr = new THREE.Quaternion(-0.015221020701376273, 0.014771105070617888, -0.015221020701376273, 0.9996591696736489)
var q5ual = new THREE.Quaternion(-0.5681462214920239, -0.8174908214752096, -0.04729095941950824, 0.08174468157198639)
var q5lal = new THREE.Quaternion(-0.13182921151887544, -0.5725356856481904, 0.13182921151887544, 0.7984015322129461)
var q5hl = new THREE.Quaternion(0.05132778699369932, -0.5116711024906244, -0.09927099022262975, 0.8518822757039713)
var q5ulr = new THREE.Quaternion(-0.23147937718537176, -0.10211084034769319, 0.9671385397167249, 0.025173780327181237)
var q5llr = new THREE.Quaternion(-0.08737008378889076, -0.06779019758454978, -0.028943214530114905, 0.9934451408622591)
var q5fr = new THREE.Quaternion(0.44996899366378784, -0.14811140298843384, 0.07595845311880112, 0.8773945569992065)
var q5ull = new THREE.Quaternion(0.03894492329065115, -0.20832423309640563, -0.9772416461387776, 0.00911437911499868)
var q5lll = new THREE.Quaternion(-0.08290691615014453, -0.23529667613980204, -0.016645681672926724, 0.9682380072759371)
var q5fl = new THREE.Quaternion(0.3631595350238158, 0.23092954634656862, -0.01252752430023503, 0.9025684228247524)

//RECOIL MIRROR
var q6uar = new THREE.Quaternion(0.6722551904237959, -0.4260595337459576, 0.11474404844074615, 0.5944577663719022)
var q6lar = new THREE.Quaternion(-0.007586829840533426, 0.17945637120633467, 0.0366556332747181, 0.9830535160384984)
var q6hr = new THREE.Quaternion(-0.015221020701376273, 0.014771105070617888, -0.015221020701376273, 0.9996591696736489)
var q6ual = new THREE.Quaternion(0.33010000200007206, 0.5981818301806197, -0.5157767773317224, 0.5169011536905479)
var q6lal = new THREE.Quaternion(0.1973182670723522, -0.0687492612837869, 0.25310891103828487, 0.9446030487487911)
var q6hl = new THREE.Quaternion(0.002200532404294261, 0.0714838544048463, -0.17753888518908242, 0.9815116710780276)
var q6ulr = new THREE.Quaternion(-0.2763702322082246, -0.13070483350533985, 0.9518034668878145, 0.02461506993389496)
var q6llr = new THREE.Quaternion(-0.2115326810185591, -0.1322573529489628, -0.15159376751260875, 0.9564419726796641)
var q6fr = new THREE.Quaternion(0.44996899366378784, -0.14811140298843384, 0.07595845311880112, 0.8773945569992065)
var q6ull = new THREE.Quaternion(0.005274916744721032, -0.30100730025020617, -0.9535035334070271, -0.014063862546712713)
var q6lll = new THREE.Quaternion(-0.2689477605674201, -0.23406263183956494, 0.02926241441049575, 0.9338230547405512)
var q6fl = new THREE.Quaternion(0.3631595350238158, 0.23092954634656862, -0.01252752430023503, 0.9025684228247524)

//PASSING MIRROR
var q7uar = new THREE.Quaternion(-0.6117531393124279, 0.7699475122005366, 0.13435550047063782, -0.12201444377973597)
var q7lar = new THREE.Quaternion(-0.15312122863368433, 0.5651521519964537, -0.23268794655531275, 0.7765392803737364)
var q7hr = new THREE.Quaternion(0.02098094907134609, 0.39485844621385996, -0.020980949071346098, 0.9182627113226952)
var q7ual = new THREE.Quaternion(0.4539137817954596, 0.5927892638259998, -0.2857144661482489, 0.6007748423680824)
var q7lal = new THREE.Quaternion(0.26823642821238414, -0.06640120414986614, -0.11586509911668931, 0.954052083208244)
var q7hl = new THREE.Quaternion(0.002200532404294261, 0.0714838544048463, -0.17753888518908242, 0.9815116710780276)
var q7ulr = new THREE.Quaternion(0.28423806256769163, -0.3540501211902194, -0.8730605511976339, 0.17782718975297196)
var q7llr = new THREE.Quaternion(-0.5114285637201612, -0.08377111277987938, -0.3148836055713837, 0.7951550413706243)
var q7fr = new THREE.Quaternion(0.26501374123473814, -0.21882714558716337, 0.006086297982159337, 0.9390662140061339)
var q7ull = new THREE.Quaternion(0.003183424911378919, -0.09560014037406425, -0.9951055773204255, -0.024806631211745665)
var q7lll = new THREE.Quaternion(-0.11776906202348474, -0.23281892838047658, 0.014553017219205079, 0.9652533368539539)
var q7fl = new THREE.Quaternion(0.40972200941475606, 0.3115929687876847, -0.14500836007325663, 0.8449912853468232)

//HIGH POINT MIRROR
var q8uar = new THREE.Quaternion(0.4764387675747504, -0.5838779255427814, 0.2802015727923275, 0.5946257204497779)
var q8lar = new THREE.Quaternion(0.007796077303510944, -0.07109152524818477, -0.3127650397058856, 0.9471342281611091)
var q8hr = new THREE.Quaternion(-0.015585503541687949, -0.014386003459995095, 0.040205140424244695, 0.9989663065725829)
var q8ual = new THREE.Quaternion(0.5963250498137155, 0.7996898180789532, 0.0411774096499178, 0.05654246864121887)
var q8lal = new THREE.Quaternion(0.023842640471298283, -0.42000538061207954, 0.05698510168244149, 0.9054168691484054)
var q8hl = new THREE.Quaternion(0.054310527995203015, -0.46212312903331226, 0.12797340976172175, 0.8758512354020525)
var q8ulr = new THREE.Quaternion(-0.3077215032490353, 0.39206195653237086, 0.8555173526372929, -0.14030309338942307)
var q8llr = new THREE.Quaternion(-0.37432440567779696, -0.12741519565704199, -0.19851189494957983, 0.8967940871756286)
var q8fr = new THREE.Quaternion(0.26501374123473814, -0.21882714558716337, 0.006086297982159337, 0.9390662140061339)
var q8ull = new THREE.Quaternion(0.0399891534180775, -0.03992551521268978, 0.9984018100335328, -0.0008040930742684838)
var q8lll = new THREE.Quaternion(-0.08440045080516127, -0.21106387822451278, -0.019176351429515986, 0.9736328213236063)
var q8fl = new THREE.Quaternion(0.48924044209318857, 0.24153165167072246, -0.15385128260905304, 0.823793684062474)

export function getAnimation(player, skeleton) {
	//qui vengono definiti i singoli keyframe
	//[2,4,5...] definisce per ogni track(q1,q2,q3,...) la posizione nel tempo (a 2sec q1, a 4sec q2, ecc.. )
	var KFuar = new THREE.QuaternionKeyframeTrack(
		skeleton.bones[47].name + ".quaternion",
		[2, 8, 14, 20, 26, 32, 38, 44, 50],
		[
			q1uar.x,
			q1uar.y,
			q1uar.z,
			q1uar.w,
			q2uar.x,
			q2uar.y,
			q2uar.z,
			q2uar.w,
			q3uar.x,
			q3uar.y,
			q3uar.z,
			q3uar.w,
			q4uar.x,
			q4uar.y,
			q4uar.z,
			q4uar.w,
			q5uar.x,
			q5uar.y,
			q5uar.z,
			q5uar.w,
			q6uar.x,
			q6uar.y,
			q6uar.z,
			q6uar.w,
			q7uar.x,
			q7uar.y,
			q7uar.z,
			q7uar.w,
			q8uar.x,
			q8uar.y,
			q8uar.z,
			q8uar.w,
			q1uar.x,
			q1uar.y,
			q1uar.z,
			q1uar.w
		]
	)
	var KFlar = new THREE.QuaternionKeyframeTrack(
		skeleton.bones[48].name + ".quaternion",
		[2, 8, 14, 20, 26, 32, 38, 44, 50],
		[
			q1lar.x,
			q1lar.y,
			q1lar.z,
			q1lar.w,
			q2lar.x,
			q2lar.y,
			q2lar.z,
			q2lar.w,
			q3lar.x,
			q3lar.y,
			q3lar.z,
			q3lar.w,
			q4lar.x,
			q4lar.y,
			q4lar.z,
			q4lar.w,
			q5lar.x,
			q5lar.y,
			q5lar.z,
			q5lar.w,
			q6lar.x,
			q6lar.y,
			q6lar.z,
			q6lar.w,
			q7lar.x,
			q7lar.y,
			q7lar.z,
			q7lar.w,
			q8lar.x,
			q8lar.y,
			q8lar.z,
			q8lar.w,
			q1lar.x,
			q1lar.y,
			q1lar.z,
			q1lar.w
		]
	)
	var KFhr = new THREE.QuaternionKeyframeTrack(
		skeleton.bones[49].name + ".quaternion",
		[2, 8, 14, 20, 26, 32, 38, 44, 50],
		[
			q1hr.x,
			q1hr.y,
			q1hr.z,
			q1hr.w,
			q2hr.x,
			q2hr.y,
			q2hr.z,
			q2hr.w,
			q3hr.x,
			q3hr.y,
			q3hr.z,
			q3hr.w,
			q4hr.x,
			q4hr.y,
			q4hr.z,
			q4hr.w,
			q5hr.x,
			q5hr.y,
			q5hr.z,
			q5hr.w,
			q6hr.x,
			q6hr.y,
			q6hr.z,
			q6hr.w,
			q7hr.x,
			q7hr.y,
			q7hr.z,
			q7hr.w,
			q8hr.x,
			q8hr.y,
			q8hr.z,
			q8hr.w,
			q1hr.x,
			q1hr.y,
			q1hr.z,
			q1hr.w
		]
	)
	var KFual = new THREE.QuaternionKeyframeTrack(
		skeleton.bones[15].name + ".quaternion",
		[2, 8, 14, 20, 26, 32, 38, 44, 50],
		[
			q1ual.x,
			q1ual.y,
			q1ual.z,
			q1ual.w,
			q2ual.x,
			q2ual.y,
			q2ual.z,
			q2ual.w,
			q3ual.x,
			q3ual.y,
			q3ual.z,
			q3ual.w,
			q4ual.x,
			q4ual.y,
			q4ual.z,
			q4ual.w,
			q5ual.x,
			q5ual.y,
			q5ual.z,
			q5ual.w,
			q6ual.x,
			q6ual.y,
			q6ual.z,
			q6ual.w,
			q7ual.x,
			q7ual.y,
			q7ual.z,
			q7ual.w,
			q8ual.x,
			q8ual.y,
			q8ual.z,
			q8ual.w,
			q1ual.x,
			q1ual.y,
			q1ual.z,
			q1ual.w
		]
	)
	var KFlal = new THREE.QuaternionKeyframeTrack(
		skeleton.bones[16].name + ".quaternion",
		[2, 8, 14, 20, 26, 32, 38, 44, 50],
		[
			q1lal.x,
			q1lal.y,
			q1lal.z,
			q1lal.w,
			q2lal.x,
			q2lal.y,
			q2lal.z,
			q2lal.w,
			q3lal.x,
			q3lal.y,
			q3lal.z,
			q3lal.w,
			q4lal.x,
			q4lal.y,
			q4lal.z,
			q4lal.w,
			q5lal.x,
			q5lal.y,
			q5lal.z,
			q5lal.w,
			q6lal.x,
			q6lal.y,
			q6lal.z,
			q6lal.w,
			q7lal.x,
			q7lal.y,
			q7lal.z,
			q7lal.w,
			q8lal.x,
			q8lal.y,
			q8lal.z,
			q8lal.w,
			q1lal.x,
			q1lal.y,
			q1lal.z,
			q1lal.w
		]
	)
	var KFhl = new THREE.QuaternionKeyframeTrack(
		skeleton.bones[17].name + ".quaternion",
		[2, 8, 14, 20, 26, 32, 38, 44, 50],
		[
			q1hl.x,
			q1hl.y,
			q1hl.z,
			q1hl.w,
			q2hl.x,
			q2hl.y,
			q2hl.z,
			q2hl.w,
			q3hl.x,
			q3hl.y,
			q3hl.z,
			q3hl.w,
			q4hl.x,
			q4hl.y,
			q4hl.z,
			q4hl.w,
			q5hl.x,
			q5hl.y,
			q5hl.z,
			q5hl.w,
			q6hl.x,
			q6hl.y,
			q6hl.z,
			q6hl.w,
			q7hl.x,
			q7hl.y,
			q7hl.z,
			q7hl.w,
			q8hl.x,
			q8hl.y,
			q8hl.z,
			q8hl.w,
			q1hl.x,
			q1hl.y,
			q1hl.z,
			q1hl.w
		]
	)
	var KFulr = new THREE.QuaternionKeyframeTrack(
		skeleton.bones[76].name + ".quaternion",
		[2, 8, 14, 20, 26, 32, 38, 44, 50],
		[
			q1ulr.x,
			q1ulr.y,
			q1ulr.z,
			q1ulr.w,
			q2ulr.x,
			q2ulr.y,
			q2ulr.z,
			q2ulr.w,
			q3ulr.x,
			q3ulr.y,
			q3ulr.z,
			q3ulr.w,
			q4ulr.x,
			q4ulr.y,
			q4ulr.z,
			q4ulr.w,
			q5ulr.x,
			q5ulr.y,
			q5ulr.z,
			q5ulr.w,
			q6ulr.x,
			q6ulr.y,
			q6ulr.z,
			q6ulr.w,
			q7ulr.x,
			q7ulr.y,
			q7ulr.z,
			q7ulr.w,
			q8ulr.x,
			q8ulr.y,
			q8ulr.z,
			q8ulr.w,
			q1ulr.x,
			q1ulr.y,
			q1ulr.z,
			q1ulr.w
		]
	)
	var KFllr = new THREE.QuaternionKeyframeTrack(
		skeleton.bones[77].name + ".quaternion",
		[2, 8, 14, 20, 26, 32, 38, 44, 50],
		[
			q1llr.x,
			q1llr.y,
			q1llr.z,
			q1llr.w,
			q2llr.x,
			q2llr.y,
			q2llr.z,
			q2llr.w,
			q3llr.x,
			q3llr.y,
			q3llr.z,
			q3llr.w,
			q4llr.x,
			q4llr.y,
			q4llr.z,
			q4llr.w,
			q5llr.x,
			q5llr.y,
			q5llr.z,
			q5llr.w,
			q6llr.x,
			q6llr.y,
			q6llr.z,
			q6llr.w,
			q7llr.x,
			q7llr.y,
			q7llr.z,
			q7llr.w,
			q8llr.x,
			q8llr.y,
			q8llr.z,
			q8llr.w,
			q1llr.x,
			q1llr.y,
			q1llr.z,
			q1llr.w
		]
	)
	var KFfr = new THREE.QuaternionKeyframeTrack(
		skeleton.bones[78].name + ".quaternion",
		[2, 8, 14, 20, 26, 32, 38, 44, 50],
		[
			q1fr.x,
			q1fr.y,
			q1fr.z,
			q1fr.w,
			q2fr.x,
			q2fr.y,
			q2fr.z,
			q2fr.w,
			q3fr.x,
			q3fr.y,
			q3fr.z,
			q3fr.w,
			q4fr.x,
			q4fr.y,
			q4fr.z,
			q4fr.w,
			q5fr.x,
			q5fr.y,
			q5fr.z,
			q5fr.w,
			q6fr.x,
			q6fr.y,
			q6fr.z,
			q6fr.w,
			q7fr.x,
			q7fr.y,
			q7fr.z,
			q7fr.w,
			q8fr.x,
			q8fr.y,
			q8fr.z,
			q8fr.w,
			q1fr.x,
			q1fr.y,
			q1fr.z,
			q1fr.w
		]
	)
	var KFull = new THREE.QuaternionKeyframeTrack(
		skeleton.bones[81].name + ".quaternion",
		[2, 8, 14, 20, 26, 32, 38, 44, 50],
		[
			q1ull.x,
			q1ull.y,
			q1ull.z,
			q1ull.w,
			q2ull.x,
			q2ull.y,
			q2ull.z,
			q2ull.w,
			q3ull.x,
			q3ull.y,
			q3ull.z,
			q3ull.w,
			q4ull.x,
			q4ull.y,
			q4ull.z,
			q4ull.w,
			q5ull.x,
			q5ull.y,
			q5ull.z,
			q5ull.w,
			q6ull.x,
			q6ull.y,
			q6ull.z,
			q6ull.w,
			q7ull.x,
			q7ull.y,
			q7ull.z,
			q7ull.w,
			q8ull.x,
			q8ull.y,
			q8ull.z,
			q8ull.w,
			q1ull.x,
			q1ull.y,
			q1ull.z,
			q1ull.w
		]
	)
	var KFlll = new THREE.QuaternionKeyframeTrack(
		skeleton.bones[82].name + ".quaternion",
		[2, 8, 14, 20, 26, 32, 38, 44, 50],
		[
			q1lll.x,
			q1lll.y,
			q1lll.z,
			q1lll.w,
			q2lll.x,
			q2lll.y,
			q2lll.z,
			q2lll.w,
			q3lll.x,
			q3lll.y,
			q3lll.z,
			q3lll.w,
			q4lll.x,
			q4lll.y,
			q4lll.z,
			q4lll.w,
			q5lll.x,
			q5lll.y,
			q5lll.z,
			q5lll.w,
			q6lll.x,
			q6lll.y,
			q6lll.z,
			q6lll.w,
			q7lll.x,
			q7lll.y,
			q7lll.z,
			q7lll.w,
			q8lll.x,
			q8lll.y,
			q8lll.z,
			q8lll.w,
			q1lll.x,
			q1lll.y,
			q1lll.z,
			q1lll.w
		]
	)
	var KFfl = new THREE.QuaternionKeyframeTrack(
		skeleton.bones[83].name + ".quaternion",
		[2, 8, 14, 20, 26, 32, 38, 44, 50],
		[
			q1fl.x,
			q1fl.y,
			q1fl.z,
			q1fl.w,
			q2fl.x,
			q2fl.y,
			q2fl.z,
			q2fl.w,
			q3fl.x,
			q3fl.y,
			q3fl.z,
			q3fl.w,
			q4fl.x,
			q4fl.y,
			q4fl.z,
			q4fl.w,
			q5fl.x,
			q5fl.y,
			q5fl.z,
			q5fl.w,
			q6fl.x,
			q6fl.y,
			q6fl.z,
			q6fl.w,
			q7fl.x,
			q7fl.y,
			q7fl.z,
			q7fl.w,
			q8fl.x,
			q8fl.y,
			q8fl.z,
			q8fl.w,
			q1fl.x,
			q1fl.y,
			q1fl.z,
			q1fl.w
		]
	)
	//infine viene creata la clip definendo la durata totale dell'animazione (in questo caso 50) e tutti i keyframe (arti coinvolti) dell'animazione
	var clip = new THREE.AnimationClip("Walk", 50, [KFual, KFlal, KFhl, KFuar, KFlar, KFhr, KFull, KFlll, KFfl, KFulr, KFllr, KFfr])
	var mixer = new THREE.AnimationMixer(player.children[0])
	var AnimationAction = mixer.clipAction(clip)
	AnimationAction.timeScale = 55
	var clock = new THREE.Clock()
	return [mixer, AnimationAction, clock]
}
