import 'package:get/get.dart';
import 'package:vocadb_app/controllers.dart';
import 'package:vocadb_app/repositories.dart';
import 'package:vocadb_app/services.dart';

class MainPageBinding implements Bindings {
  @override
  void dependencies() {
    final httpService = Get.find<HttpService>();
    Get.put<LoginPageController>(
        LoginPageController(
            authRepository: AuthRepository(httpService: httpService)),
        permanent: true);
    Get.lazyPut<MainPageController>(() => MainPageController());
    Get.lazyPut<HomePageController>(() => HomePageController(
        songRepository: SongRepository(httpService: httpService),
        albumRepository: AlbumRepository(httpService: httpService),
        releaseEventRepository:
            ReleaseEventRepository(httpService: httpService)));

    Get.lazyPut<RankingController>(() => RankingController(
        songRepository: SongRepository(httpService: httpService)));
  }
}
