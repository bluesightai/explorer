export type Config = {
  style_id: string
  name: string
  table_name: string
  polygon: number[][]
  initial_lat: number
  initial_lon: number
}

export const user_name = "szymonzmyslony"
export const mapboxToken =
  "pk.eyJ1Ijoic3p5bW9uem15c2xvbnkiLCJhIjoiY2x5eDYxb2JqMWxkaTJrczZjZ3Nhd2hrZSJ9.jpzoW1-5ILOP-hIWtXBPxA"

export const get_style_url = (style_id: string) => `mapbox://styles/${user_name}/${style_id}`

export const ukraine_config: Config = {
  style_id: "clzyzkpvm005j01pn6xcwcq8f",
  name: "Ukraine",
  initial_lat: 51.201676776472034,
  initial_lon: 35.34085886509449,
  table_name: "defense_boxes",
  polygon: [
    [35.22523850097286, 51.22252531315613],
    [35.23329263632898, 51.22676466941128],
    [35.23326649397523, 51.2267831730739],
    [35.24132010310003, 51.2310211897942],
    [35.24129761802745, 51.23103710806203],
    [35.2493733064634, 51.23522915283609],
    [35.24934194729504, 51.23525135060204],
    [35.25739668758, 51.23946967769867],
    [35.25738288388783, 51.23947944513804],
    [35.26747879184336, 51.24475721308406],
    [35.26750838178071, 51.24473626938283],
    [35.27553435305295, 51.24896544044171],
    [35.27554265416341, 51.24895957019979],
    [35.28358283214636, 51.25315688949934],
    [35.28361742367012, 51.25313246765234],
    [35.2916396041765, 51.25732586849934],
    [35.29167925218992, 51.25729787264644],
    [35.29965170234481, 51.26149208534724],
    [35.29971588530556, 51.2614468798576],
    [35.30768220823235, 51.26564326116779],
    [35.30777944345098, 51.26557480593443],
    [35.31572203039248, 51.26975827228617],
    [35.3158302311319, 51.26968197882061],
    [35.32378720727334, 51.27382948488808],
    [35.32391984844242, 51.27373594823184],
    [35.33183207177165, 51.27786285960494],
    [35.33199035882308, 51.27775142554994],
    [35.33989469982239, 51.28190322806758],
    [35.34006065859403, 51.28178655310344],
    [35.34799123461394, 51.2858929077812],
    [35.34811436227722, 51.28580650884778],
    [35.35601753762557, 51.28993605620669],
    [35.35613037741928, 51.28985704128959],
    [35.36414101039173, 51.29398830013273],
    [35.36414990891741, 51.29398206120391],
    [35.37025939513562, 51.29714602450601],
    [35.37022555972093, 51.29716981303658],
    [35.37826699010621, 51.30143132828461],
    [35.37820559885627, 51.30147447239231],
    [35.38832563044887, 51.30674855842143],
    [35.40961712492388, 51.29177591682588],
    [35.40146910272685, 51.2875269901751],
    [35.40155337147389, 51.2874677852279],
    [35.39348384389456, 51.28322564865097],
    [35.39353840444871, 51.28318733148297],
    [35.38352825042553, 51.27790768751107],
    [35.38351694707494, 51.27791560532506],
    [35.37933949794166, 51.27572118940895],
    [35.39564734528964, 51.26424776305068],
    [35.40218149460439, 51.26761631919338],
    [35.4085740277757, 51.27096598209714],
    [35.40851042122649, 51.27101071617574],
    [35.41653799322994, 51.27528371084771],
    [35.41647814177473, 51.27532585396869],
    [35.42652595305977, 51.28058764731358],
    [35.44766282755417, 51.26564225254661],
    [35.43958960640457, 51.26139419627966],
    [35.43968554110533, 51.26132652353636],
    [35.43163631215151, 51.25708681984357],
    [35.43171305644514, 51.25703267444789],
    [35.42377464221619, 51.25280859886974],
    [35.42378048051807, 51.25280448117906],
    [35.41382969373756, 51.24753614840665],
    [35.41376153714181, 51.24758390058685],
    [35.40576399445106, 51.2433971884388],
    [35.40565620055482, 51.24347287073932],
    [35.39777151409769, 51.23928746007375],
    [35.39764476517717, 51.23937653588663],
    [35.38976538899913, 51.23519571404992],
    [35.38961835075793, 51.23529922277652],
    [35.38172430758778, 51.23113316088232],
    [35.38161572073193, 51.23120972805948],
    [35.37367671969791, 51.22707531560887],
    [35.37360744651772, 51.22712424690811],
    [35.36564040451847, 51.22298406348675],
    [35.36560032853803, 51.2230124265587],
    [35.35981819402318, 51.21988064216972],
    [35.35982513882085, 51.21987573985484],
    [35.35917309807181, 51.21953123808292],
    [35.35779096779115, 51.21878263321643],
    [35.35777607506071, 51.21879312945483],
    [35.34984109156998, 51.2146007290922],
    [35.34982539875335, 51.21461178393541],
    [35.34385935915704, 51.21149384285224],
    [35.3438815592637, 51.21147819065654],
    [35.33576492519362, 51.20725338450573],
    [35.33578802854335, 51.20723709095576],
    [35.32769015473959, 51.20300580139612],
    [35.32772257653216, 51.20298290375042],
    [35.31968059897379, 51.19874162619536],
    [35.31972498776413, 51.19871026203717],
    [35.31169650547649, 51.19445834852592],
    [35.31175895945802, 51.19441423394952],
    [35.30372294249511, 51.19016794195186],
    [35.30377602487849, 51.19013041685162],
    [35.29575660535535, 51.18586442560903],
    [35.29580305602785, 51.18583158541513],
    [35.21182833029327, 51.14057455526826],
    [35.19398125196069, 51.15377476690924],
    [35.162251591974695, 51.137335238605075],
    [35.14344330206582, 51.15413699082549],
    [35.17138029106714, 51.17038392534624],
    [35.15310722526462, 51.18404225506136],
    [35.22523850097286, 51.22252531315613],
  ],
}

export const cali_config: Config = {
  name: "Bay Area",
  style_id: "clz17ert500in01pf3em1aeor",

  table_name: "clip_boxes",
  initial_lat: 37.53126258079075,
  initial_lon: -122.0620083919965,
  polygon: [
    [-122.62763794718, 37.1849048387767],
    [-121.496378836813, 37.1849048387767],
    [-121.496378836813, 37.8776203228048],
    [-122.62763794718, 37.8776203228048],
    [-122.62763794718, 37.1849048387767],
  ],
}
