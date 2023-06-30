<?php

namespace Tests\Unit\Services;

use App\Models\Purchase;
use App\Services\PurchaseService;
use Database\Seeders\CategorySeeder;
use Database\Seeders\ItemSeeder;
use Database\Seeders\PlanSeeder;
use Database\Seeders\PurchaseSeeder;
use Database\Seeders\UnitSeeder;
use Database\Seeders\UserSeeder;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PurchaseServiceTest extends TestCase
{
    use DatabaseTransactions;

    public function setUp(): void
    {
        parent::setUp();

        // テスト用のデータベースシーダーを実行
        $this->seed(UserSeeder::class);
        $this->seed(CategorySeeder::class);
        $this->seed(UnitSeeder::class);
        $this->seed(ItemSeeder::class);
        $this->seed(PlanSeeder::class);
        $this->seed(PurchaseSeeder::class);
    }

    public function testCalculateAverageConsumptionDaysPerQuantity()
    {
        // テストに必要なデータを準備する
        $planId = 1;



        // PurchaseServiceのインスタンスを作成
        $service = new PurchaseService();

        // calculateAverageConsumptionDaysPerQuantityメソッドを呼び出す
        $result = $service->calculateAverageConsumptionDaysPerQuantity($planId);

        // 期待される結果と実際の結果を比較する
        // 期待される結果は、(10) / (10) = 1
        $this->assertEquals(1, $result);
    }
}
